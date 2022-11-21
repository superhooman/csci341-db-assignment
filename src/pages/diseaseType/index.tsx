import type { NextPage } from "next";
import { MainLayout } from "../../layouts/Main";
import { trpc } from "../../utils/trpc";
import React from "react";
import { CRUD, type FieldDef } from "../../components/CRUD";
import { z } from "zod";
import { Title } from "../../components/Typography";

const columns: FieldDef[] = [
    { field: 'id', label: 'ID', valueFormatter: (id: number) => String(id === -1 ? '' : id), schema: z.number(), notEditable: true },
    {
        field: 'description',
        label: 'Description',
        schema: z.string(),
    },
];

const DiseaseTypesPage: NextPage = () => {
    const { diseaseType: { get: { invalidate: invalidateGet } } } = trpc.useContext();

    const { data } = trpc.diseaseType.get.useQuery();
    const { mutateAsync: update } = trpc.diseaseType.update.useMutation();
    const { mutateAsync: removePre } = trpc.diseaseType.delete.useMutation();

    const remove = React.useCallback(async (ids: (string | number)[]) => {
        await removePre(ids as number[]);
    }, [removePre]);

    return (
        <MainLayout>
            <CRUD
                data={data}
                columns={columns}
                emptyRow={{ id: -1, description: '' }}
                update={update}
                remove={remove}
                invalidate={invalidateGet}
                title="Disease Types"
            />
        </MainLayout>
    )
}

export default DiseaseTypesPage;