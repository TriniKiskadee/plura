import React from 'react';

interface AgencyIdPageProps {
    params: {
        agencyId: string
    }
}

const Page = ({params}: AgencyIdPageProps) => {
    return (
        <div>
            {params.agencyId}
        </div>
    );
};

export default Page;

