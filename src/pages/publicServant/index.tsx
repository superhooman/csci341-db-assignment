import type { NextPage } from "next";
import { MainLayout } from "../../layouts/Main";
import { trpc } from "../../utils/trpc";
import React from "react";
import { CRUD, FieldDef } from "../../components/CRUD";
import type { PublicServant } from "@prisma/client";
import { z } from "zod";
import { Title } from "../../components/Typography";

const PublicServantPage: NextPage = () => {
    const { publicServant: { get: { invalidate: invalidateGet } } } = trpc.useContext();

    const { data: users } = trpc.user.get.useQuery();
    const { data } = trpc.publicServant.get.useQuery();
    const { mutateAsync: update } = trpc.publicServant.update.useMutation();
    const { mutateAsync: removePre } = trpc.publicServant.delete.useMutation();

    const remove = React.useCallback(async (ids: (number | string)[]) => {
        await removePre(ids as string[]);
    }, [removePre]);

    const columns: FieldDef[] = React.useMemo(() => [
        {
            field: 'email',
            label: 'User',
            type: 'select',
            schema: z.string(),
            options: users?.map(({ email, name, surname }) => ({
                label: `${name} ${surname}`,
                value: email,
            })),
            valueFormatter: (value: string) => {
                const user = users?.find(({ email }) => email === value);
                return `${user?.name} ${user?.surname}` || value;
            },
            disableOnEdit: true,
        },
        {
            field: 'department',
            label: 'Department',
            schema: z.string(),
        },
    ], [users]);

    return (
        <MainLayout>
            <CRUD
                data={data}
                columns={columns}
                emptyRow={{ email: '', department: ''}}
                update={update}
                remove={remove}
                getId={(row) => row.email}
                invalidate={invalidateGet}
                title="Public Servants"
            />
        </MainLayout>
    )
}

export default PublicServantPage;