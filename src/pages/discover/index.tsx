import type { NextPage } from "next";
import { MainLayout } from "../../layouts/Main";
import { trpc } from "../../utils/trpc";
import React from "react";
import { CRUD, type FieldDef } from "../../components/CRUD";
import { z } from "zod";
import { Title } from "../../components/Typography";

const DiscoverPage: NextPage = () => {
    const { discover: { get: { invalidate: invalidateGet } } } = trpc.useContext();

    const { data: countries } = trpc.country.get.useQuery();
    const { data: codes } = trpc.disease.get.useQuery();
    const { data } = trpc.discover.get.useQuery();
    const { mutateAsync: update } = trpc.discover.update.useMutation();
    const { mutateAsync: removePre } = trpc.discover.delete.useMutation();

    const remove = React.useCallback(async (ids: (string | number)[]) => {
        await removePre(ids as string[]);
    }, [removePre]);

    const columns: FieldDef[] = React.useMemo(() => [
        {
            field: 'cname',
            label: 'Country',
            type: 'select',
            options: countries?.map(({ cname }) => ({
                label: cname,
                value: cname,
            })),
            schema: z.string(),
            valueFormatter: (value) => {
                const country = countries?.find(({ cname }) => cname === value);
                return country?.cname || value;
            },
            disableOnEdit: true,
        },
        {
            field: 'disease_code',
            label: 'Disease',
            type: 'select',
            options: codes?.map(({ disease_code }) => ({
                label: disease_code,
                value: disease_code,
            })),
            schema: z.string(),
            valueFormatter: (value) => {
                const code = codes?.find(({ disease_code }) => disease_code === value);
                return code?.disease_code || value;
            },
            disableOnEdit: true,
        },
        {
            field: 'first_enc_date',
            label: 'First Encountered',
            type: 'date',
            schema: z.date(),
        }
    ], [countries, codes]);

    return (
        <MainLayout>
            <CRUD
                data={data}
                columns={columns}
                emptyRow={{ disease_code: '', cname: '', first_enc_date: (new Date()) }}
                update={update}
                remove={remove}
                getId={(row) => `${row.cname}!${row.disease_code}`}
                invalidate={invalidateGet}
                title="Discoveries"
            />
        </MainLayout>
    )
}

export default DiscoverPage;