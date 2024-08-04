import React from 'react';
import Navigation from "@/components/site/navigation";
import {dark} from "@clerk/themes";
import {ClerkProvider} from "@clerk/nextjs";

const Layout = ({children}: {children: React.ReactNode}) => {
    return (
        <ClerkProvider
            appearance={{
                baseTheme: dark
            }}
        >
            <main className={'h-full'}>
                <Navigation />
                {children}
            </main>
        </ClerkProvider>
    );
};

export default Layout;