import type { NextPage } from "next";
import { MainLayout } from "../../layouts/Main";
import { trpc } from "../../utils/trpc";
import React from "react";
import type { FieldDef } from "../../components/CRUD";
import { CRUD } from "../../components/CRUD";
import { z } from "zod";
import { Title } from "../../components/Typography";

const SpecializePage: NextPage = () => {
    const { specialize: { get: { invalidate: invalidateGet } } } = trpc.useContext();

    const { data: types } = trpc.diseaseType.get.useQuery();
    const { data: doctors } = trpc.doctor.get.useQuery();
    const { data } = trpc.specialize.get.useQuery();
    const { mutateAsync: update } = trpc.specialize.update.useMutation();
    const { mutateAsync: removePre } = trpc.specialize.delete.useMutation();

    const remove = React.useCallback(async (ids: (number | string)[]) => {
        await removePre(ids as string[]);
    }, [removePre]);

    const columns: FieldDef[] = React.useMemo(() => [
        {
            field: 'id',
            label: 'DiseaseType',
            type: 'select',
            schema: z.number(),
            options: types?.map(({ id, description }) => ({
                label: description,
                value: id,
            })),
            valueFormatter: (params: number) => {
                const type = types?.find(({ id }) => id === params);
                return String(type?.description || params);
            },
        },
        {
            field: 'email',
            label: 'Doctor',
            type: 'select',
            schema: z.string().email(),
            editable: true,
            options: doctors?.map(({ email }) => ({
                label: email,
                value: email,
            })),
            valueFormatter: (params: string) => {
                const doc = doctors?.find(({ email }) => email === params);
                return doc?.email || params;
            },
        },
    ], [types, doctors]);

    return (
        <MainLayout>
            <CRUD
                data={data}
                columns={columns}
                emptyRow={{ id: -1, email: '' }}
                update={update}
                remove={remove}
                getId={(row) => `${row.id}!${row.email}`}
                invalidate={invalidateGet}
                title="Specialize"
                noEdit
            />
        </MainLayout>
    )
}

export default SpecializePage;