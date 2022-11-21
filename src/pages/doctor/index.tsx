import type { NextPage } from "next";
import { MainLayout } from "../../layouts/Main";
import { trpc } from "../../utils/trpc";
import React from "react";
import { CRUD, type FieldDef } from "../../components/CRUD";
import { z } from "zod";
import { Title } from "../../components/Typography";

const DoctorPage: NextPage = () => {
    const { doctor: { get: { invalidate: invalidateGet } } } = trpc.useContext();

    const { data: users } = trpc.user.get.useQuery();
    const { data } = trpc.doctor.get.useQuery();
    const { mutateAsync: update } = trpc.doctor.update.useMutation();
    const { mutateAsync: removePre } = trpc.doctor.delete.useMutation();

    const remove = React.useCallback(async (ids: (string | number)[]) => {
        await removePre(ids as string[]);
    }, [removePre]);

    const columns: FieldDef[] = React.useMemo(() => [        
        {
            field: 'email',
            label: 'User',
            type: 'select',
            disableOnEdit: true,
            schema: z.string(),
            options: users?.map(({ email, name, surname }) => ({
                label: `${name} ${surname}`,
                value: email,
            })),
            valueFormatter: (value: string) => {
                const user = users?.find(({ email }) => email === value);
                return `${user?.name} ${user?.surname}` || value;
            },
        },
        {
            field: 'degree',
            label: 'Degree',
            schema: z.string(),
        },
    ], [users]);

    return (
        <MainLayout>
            <CRUD
                data={data}
                columns={columns}
                emptyRow={{ email: '', degree: '' }}
                update={update}
                remove={remove}
                getId={(row) => row.email}
                invalidate={invalidateGet}
                title="Doctors"
            />
        </MainLayout>
    )
}

export default DoctorPage;