import React from 'react';
import {getMedia} from "@/lib/queries";
import BlurPage from "@/components/global/BlurPage";
import MediaComponent from "@/components/media";

interface MediaPageProps {
    params: {
        subaccountId: string
    }
}

const MediaPage = async ({params}: MediaPageProps) => {
    const data = await getMedia(params.subaccountId)

    return (
        <BlurPage>
            <MediaComponent
                data={data}
                subaccountId={params.subaccountId}
            />
        </BlurPage>
    );
};

export default MediaPage;