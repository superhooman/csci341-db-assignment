import type { NextPage } from "next";
import { MainLayout } from "../../layouts/Main";
import { trpc } from "../../utils/trpc";
import React from "react";
import { CRUD, type FieldDef } from "../../components/CRUD";
import type { Record } from "@prisma/client";
import { z } from "zod";
import { Title } from "../../components/Typography";

const RecordsPage: NextPage = () => {
    const { record: { get: { invalidate: invalidateGet } } } = trpc.useContext();

    const { data: diseases } = trpc.disease.get.useQuery();
    const { data: publicServants } = trpc.publicServant.get.useQuery();
    const { data: countries } = trpc.country.get.useQuery();
    const { data } = trpc.record.get.useQuery();
    const { mutateAsync: update } = trpc.record.update.useMutation();
    const { mutateAsync: removePre } = trpc.record.delete.useMutation();

    const remove = React.useCallback(async (ids: (number | string)[]) => {
        await removePre(ids as string[]);
    }, [removePre]);

    const columns: FieldDef[] = React.useMemo(() => [
        {
            field: 'email',
            label: 'Public Servant',
            type: 'select',
            options: publicServants?.map(({ email }) => ({
                label: email,
                value: email,
            })),
            schema: z.string(),
            valueFormatter: (value: string) => {
                const ps = publicServants?.find(({ email }) => email === value);
                return ps?.email || value;
            },
            disableOnEdit: true,
        },
        {
            field: 'cname',
            label: 'Country',
            type: 'select',
            options: countries?.map(({ cname }) => ({
                label: cname,
                value: cname,
            })),
            schema: z.string(),
            valueFormatter: (value: string) => {
                const c = countries?.find(({ cname }) => cname === value);
                return c?.cname || value;
            },
            disableOnEdit: true,
        },
        {
            field: 'disease_code',
            label: 'Disease',
            type: 'select',
            width: 150,
            editable: true,
            options: diseases?.map(({ disease_code }) => ({
                label: disease_code,
                value: disease_code,
            })),
            schema: z.string(),
            valueFormatter: (value: string) => {
                const d = diseases?.find(({ disease_code }) => disease_code === value);
                return d?.disease_code || value;
            },
            disableOnEdit: true,
        },
        {
            field: 'total_deaths',
            label: 'Total Deaths',
            type: 'number',
            schema: z.number(),
        },
        {
            field: 'total_patients',
            label: 'Total Patients',
            type: 'number',
            schema: z.number(),
        }
    ], [countries, publicServants, diseases]);

    return (
        <MainLayout>
            <CRUD
                data={data}
                columns={columns}
                emptyRow={{ cname: '', disease_code: '', email: '', total_deaths: 0, total_patients: 0 }}
                update={update}
                remove={remove}
                getId={(row) => `${row.email}!${row.cname}!${row.disease_code}`}
                invalidate={invalidateGet}
                title="Records"
            />
        </MainLayout>
    )
}

export default RecordsPage;