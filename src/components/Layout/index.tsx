import Head from 'next/head'
import Link from 'next/link';
import stylesHeader from './header.module.css'

export type LayoutProps = {
    title?: string;
    children?: React.ReactNode;
}

export default function Layout({children, title}: LayoutProps) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://example.com";
    const meta = {
        url: baseUrl,
        title: (title ? title + " | " : "") + (process.env.NEXT_PUBLIC_META_TITLE || "Personal Website"),
        description: process.env.NEXT_PUBLIC_META_DESCRIPTION || "Welcome to my personal website!",
        image: baseUrl + "/avatar.jpg"
    }
    return (
        <div>
            <Head>
                <title>{meta.title}</title>
                <meta name="description" content={meta.description}/>
                <link rel="icon" href="/favicon.ico"/>

                <meta property="og:type" content="website"/>
                <meta property="og:url" content={meta.url}/>
                <meta property="og:title" content={meta.title}/>
                <meta property="og:description" content={meta.description}/>
                <meta property="og:image" content={meta.image}/>

                <meta property="twitter:card" content="summary_large_image"/>
                <meta property="twitter:url" content={meta.url}/>
                <meta property="twitter:title" content={meta.title}/>
                <meta property="twitter:description" content={meta.description}/>
                <meta property="twitter:image" content={meta.image}/>
            </Head>
            <header className={stylesHeader.header}>
                <div>
                    <img src="/logo.png" alt="logo" className={stylesHeader.logo}/>
                </div>
            </header>
            <main className={stylesHeader.main}>
                {children}
            </main>
        </div>
    )
}
