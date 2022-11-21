import type { NextPage } from "next";
import { MainLayout } from "../../layouts/Main";
import { trpc } from "../../utils/trpc";
import React from "react";
import type { FieldDef } from "../../components/CRUD";
import { CRUD } from "../../components/CRUD";
import { z } from "zod";
import { Title } from "../../components/Typography";

const UsersPage: NextPage = () => {
    const { user: { get: { invalidate: invalidateGet } } } = trpc.useContext();

    const { data: countries } = trpc.country.get.useQuery();
    const { data } = trpc.user.get.useQuery();
    const { mutateAsync: update } = trpc.user.update.useMutation();
    const { mutateAsync: removePre } = trpc.user.delete.useMutation();

    const remove = React.useCallback(async (ids: (number | string)[]) => {
        await removePre(ids as string[]);
    }, [removePre]);

    const columns: FieldDef[] = React.useMemo(() => [
        {
            field: 'email',
            label: 'Email',
            schema: z.string().email(),
            disableOnEdit: true,
        },
        {
            field: 'name',
            label: 'Name',
            schema: z.string(),
        },
        {
            field: 'surname',
            label: 'Surname',
            schema: z.string(),
        },
        {
            field: 'salary',
            label: 'Salary',
            type: 'number',
            schema: z.number(),
        },
        {
            field: 'phone',
            label: 'Phone',
            schema: z.string(),
        },
        {
            field: 'cname',
            label: 'Country',
            type: 'select',
            schema: z.string(),
            options: countries?.map(({ cname }) => ({
                label: cname,
                value: cname,
            })),
            valueFormatter: (params: string) => {
                const country = countries?.find(({ cname }) => cname === params);
                return country?.cname || params;
            },
        },
    ], [countries]);

    return (
        <MainLayout>
            <CRUD
                data={data}
                columns={columns}
                emptyRow={{ cname: '', email: '', name: '', surname: '', salary: 0, phone: '' }}
                update={update}
                remove={remove}
                getId={(row) => row.email}
                invalidate={invalidateGet}
                title="Users"
            />
        </MainLayout>
    )
}

export default UsersPage;