import type { NextPage } from "next";
import { MainLayout } from "../../layouts/Main";
import { trpc } from "../../utils/trpc";
import React from "react";
import { CRUD, type FieldDef } from "../../components/CRUD";
import { z } from "zod";
import { Title } from "../../components/Typography";

const DiseasePage: NextPage = () => {
    const { disease: { get: { invalidate: invalidateGet } } } = trpc.useContext();

    const { data: types } = trpc.diseaseType.get.useQuery();
    const { data } = trpc.disease.get.useQuery();
    const { mutateAsync: update } = trpc.disease.update.useMutation();
    const { mutateAsync: removePre } = trpc.disease.delete.useMutation();

    const remove = React.useCallback(async (ids: (string | number)[]) => {
        await removePre(ids as string[]);
    }, [removePre]);

    const columns: FieldDef[] = React.useMemo(() => [
        { field: 'disease_code', label: 'Disease Code', width: 150, schema: z.string(), disableOnEdit: true, },
        { field: 'pathogen', label: 'Pathogen', width: 150, schema: z.string()},
        { field: 'description', label: 'Description', width: 300, schema: z.string() },
        {
            field: 'id',
            label: 'Disease Type',
            type: 'select',
            schema: z.string(),
            options: types?.map(({ description, id }) => ({
                label: description,
                value: id,
            })),
            valueFormatter: (value) => {
                const type = types?.find(({ id }) => id === value);
                return type?.description || value;
            },
        },
    ], [types]);

    return (
        <MainLayout>
            <CRUD
                data={data}
                columns={columns}
                emptyRow={{ disease_code: '', pathogen: '', description: '', id: -1, }}
                update={update}
                remove={remove}
                getId={(row) => row.disease_code}
                invalidate={invalidateGet}
                title="Diseases"
            />
        </MainLayout>
    )
}

export default DiseasePage;