import { MainLayout } from "../../layouts/Main";
import { trpc } from "../../utils/trpc";
import React from "react";
import type { FieldDef } from "../../components/CRUD";
import { CRUD } from "../../components/CRUD";
import { z } from "zod";
import type { NextPage } from "next";

const columns: FieldDef[] = [
    { field: 'cname', label: 'Name', schema: z.string(), disableOnEdit: true },
    {
        field: 'population',
        label: 'Population',
        type: 'number',
        schema: z.number(),
    },
];

const CountriesPage: NextPage = () => {
    const { country: { get: { invalidate: invalidateGet } } } = trpc.useContext();

    const { data } = trpc.country.get.useQuery();
    const { mutateAsync: update } = trpc.country.update.useMutation();
    const { mutateAsync: removePre } = trpc.country.delete.useMutation();

    const remove = React.useCallback(async (ids: (string | number)[]) => {
        await removePre(ids as string[]);
    }, [removePre]);

    return (
        <MainLayout>
            <CRUD
                data={data}
                columns={columns}
                emptyRow={{ cname: '', population: 0 }}
                update={update}
                remove={remove}
                getId={(row) => row.cname}
                invalidate={invalidateGet}
                title="Countries"
            />
        </MainLayout>
    )
}

export default CountriesPage;