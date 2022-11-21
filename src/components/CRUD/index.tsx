import React, { type ReactNode } from "react";
import type { ZodType } from "zod";
import { Pencil2Icon, PlusIcon, TrashIcon } from '@radix-ui/react-icons';
import { Button } from "../Button";
import { Card } from "../Card";
import { Stack } from "../Stack";

import cls from './CRUD.module.scss';
import { Modal } from "../Modal";
import { Select } from "../Select";
import { Input } from "../Input";
import { Title } from "../Typography";
import toast from "react-hot-toast";

interface Option {
    label: string;
    value: (string | number);
}

export interface FieldDef {
    field: string;
    label: string;
    placeholder?: string;
    type?: 'text' | 'number' | 'select' | 'date';
    schema: ZodType;
    options?: Option[];
    valueFormatter?: (params: any) => string;
    disableOnEdit?: boolean;
    notEditable?: boolean;
}

interface Props<T extends object> {
    data?: T[];
    columns: FieldDef[];
    emptyRow: T;
    getId?: (row: T) => string | number;
    update: (data: T) => Promise<T>;
    remove: (id: (string | number)[]) => Promise<void>;
    invalidate: () => void;
    title?: string;
    noEdit?: boolean;
}

const DEFAULT_GET_ID = (row: any) => row.id as string;

const renderValue = (value: any, field: FieldDef): ReactNode => {
    if (field.valueFormatter) {
        return field.valueFormatter(value);
    }
    if (field.type === 'date') {
        return new Date(value).toLocaleDateString('ru');
    }
    return value;
}

export const CRUD = <T extends object>({
    data,
    getId = DEFAULT_GET_ID,
    emptyRow,
    columns,
    update,
    remove,
    invalidate,
    title,
    noEdit = false,
}: Props<T>) => {
    const [selectedRow, setSelectedRow] = React.useState<T | null>(null);
    const [modal, setModal] = React.useState(false);

    const handleUpdate = React.useCallback(async (row: T) => {
        setSelectedRow(row);
        setModal(true);
    }, []);

    const handleRemove = React.useCallback(async (row: T) => {
        const promise = remove([getId(row)]).then(() => {
            invalidate();
        });
        toast.promise(promise, {
            success: 'Row deleted',
            error: 'Error occured',
            loading: 'Deleting...',
        })
    }, [getId, remove, invalidate]);

    return (
        <>
            <Stack
                direction="column"
                className={cls.root}
                gap={12}
            >
                <Stack
                    direction="row"
                    gap={12}
                    justifyContent="space-between"
                >
                    <Title noMargin font={24}>
                        {title}
                    </Title>
                    <Button variant="primary" onClick={() => {
                        setSelectedRow(emptyRow);
                        setModal(true);
                    }} icon={<PlusIcon />}>Add</Button>
                </Stack>
                <div className={cls.tableWrap}>
                    <table className={cls.table}>
                        <thead
                            className={cls.header}
                        >
                            <tr>
                                {columns.map(({ label }) => (
                                    <th key={label}>{label}</th>
                                ))}
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.sort((a, b) => {
                                const idA = getId(a);
                                const idB = getId(b);
                                if (idA > idB) {
                                    return 1;
                                }
                                if (idA < idB) {
                                    return -1;
                                }
                                return 0;
                            }).map((row) => (
                                <tr key={getId(row)}>
                                    {columns.map((column) => (
                                        <td key={column.field}>{renderValue(row[column.field as keyof T], column)}</td>
                                    ))}
                                    <td>
                                        <Stack style={{
                                            margin: -4,
                                        }} gap={8}>
                                            {!noEdit && (<Button onClick={() => handleUpdate(row)} icon={<Pencil2Icon />} variant="ghost" />)}
                                            <Button onClick={() => handleRemove(row)} icon={<TrashIcon />} variant="ghost" color="error" />
                                        </Stack>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Stack>
            <Modal
                open={modal}
                onOpenChange={setModal}
            >
                {selectedRow && (
                    <EditModal
                        row={selectedRow}
                        columns={columns}
                        update={update}
                        invalidate={invalidate}
                        close={() => setModal(false)}
                        getId={getId}
                        emptyRow={emptyRow}
                    />
                )}
            </Modal>
        </>
    )
}

const EditModal = <T extends object>({
    row,
    columns,
    update,
    invalidate,
    close,
    getId,
    emptyRow,
}: {
    row: T;
    columns: FieldDef[];
    update: (data: T) => Promise<T>;
    invalidate: () => void;
    close: () => void;
    getId: (row: T) => string | number;
    emptyRow: T;
}) => {
    const [data, setData] = React.useState<T>(row);

    React.useEffect(() => {
        setData(row);
    }, [row]);

    const save = React.useCallback(async () => {
        const promise = update(data).then(() => {
            invalidate();
            close();
        });
        toast.promise(promise, {
            success: 'Saved into DB',
            error: 'Error occured',
            loading: 'Saving...',
        })
    }, [close, invalidate, update, data]);

    const handleChange = React.useCallback((field: string, value: any) => {
        setData((prev) => ({
            ...prev,
            [field]: value,
        }));
    }, []);

    const isNew = React.useMemo(() => {
        return getId(row) === getId(emptyRow);
    }, [getId, row, emptyRow]);

    return (
        <Stack
            direction="column"
            gap={12}
        >
            {
                columns.map((column) => {
                    if (column.notEditable) {
                        return null;
                    }
                    if (column.type === 'select') {
                        return (
                            <Select
                                key={column.field}
                                label={column.label}
                                value={String(data[column.field as keyof T]) as string}
                                items={column.options || []}
                                disabled={column.disableOnEdit && !isNew}
                                onValueChange={(value) => handleChange(column.field, typeof row[column.field as keyof T] === 'number' ? Number(value) : value)}
                            />
                        )
                    }
                    return (
                        <Input
                            key={column.field}
                            label={column.label}
                            value={(
                                column.type === 'date' ? (
                                    data[column.field as keyof T] ? (
                                        new Date(data[column.field as keyof T] as 'string').toISOString().split('T')[0]
                                    ) : ''
                                ) : data[column.field as keyof T]
                            ) as string}
                            type={column.type || 'text'}
                            disabled={column.disableOnEdit && !isNew}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (column.type === 'date') {
                                    handleChange(column.field, new Date(value));
                                    return;
                                }
                                handleChange(column.field, typeof row[column.field as keyof T] === 'number' ? Number(value) : value)
                            }}
                        />
                    )
                })
            }
            <Button onClick={save} fullWidth variant="primary">Save</Button>
            <Button onClick={close} fullWidth >Cancel</Button>
        </Stack>
    )
}
