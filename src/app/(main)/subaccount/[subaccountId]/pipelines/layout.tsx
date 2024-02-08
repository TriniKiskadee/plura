import React, {PropsWithChildren} from 'react';
import BlurPage from "@/components/global/BlurPage";

const PipelinesLayout = ({children}: PropsWithChildren) => {
    return (
        <BlurPage>
            {children}
        </BlurPage>
    );
};

export default PipelinesLayout;