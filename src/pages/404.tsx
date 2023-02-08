import Link from 'next/link'
import {Layout} from "../components";


export default function Error404() {
    return (
        <Layout title="Страница не найдена">
            <div className={"center flex"}>
                <h1>404</h1>
                <p>
                    Извините, страница не найдена
                </p>
                <Link href="/">
                    Мне все равно, <b>вернуться домой</b>
                </Link>
            </div>
        </Layout>
    )
}