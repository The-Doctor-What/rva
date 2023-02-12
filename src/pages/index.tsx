import {Layout} from "../components";
import {useEffect, useRef, useState} from "react";
import moment from "moment";
import {useRouter} from "next/router";

export default function Home() {
    const [windowOpen, setWindowOpen] = useState(false)
    const [windowTitle, setWindowTitle] = useState("")
    const [windowContent, setWindowContent] = useState("")
    const name = useRef<any>()
    const age = useRef<any>()
    const aircraft = useRef<any>()
    const hours = useRef<any>()
    const simulator = useRef<any>()
    const others = useRef<any>()
    const vk = useRef<any>()
    const [flights, setFlights] = useState<any>({})
    const {locale} = useRouter()

    const socials = [
        {
            url: "https://discord.gg/u2KaXPMhAT",
            icon: "discord"
        },
        {
            url: "https://vk.com/vakrossiya",
            icon: "vk"
        },
    ]

    function openWindow(title: any, content: any) {
        setWindowOpen(true)
        setWindowTitle(title)
        setWindowContent(content)
    }

    useEffect(() => {
        fetch('/api/flights').then(r => r.json()).then(r => setFlights(r))
    }, [])

    const updated = moment(flights.updated).format('HH:mm')

    return (
        <Layout title={locale === "ru" ? "Главная" : "Home"}>

            <section className="text">
                <p>
                    {locale === "ru" ? `Мы - виртуальная авиакомпания Россия. Ежедневно мы перевозим более 1000 человек в разные города. Мы имеем обширный флот от Airbus A319 до Boeing 747-400` : "We are a virtual airline of Rossiya. We transport more than 1000 people every day to different cities. We have a wide range of aircraft from Airbus A319 to Boeing 747-400"}
                </p>
                <div className="bold">
                    Rossiya Virtual Airline - {locale === "ru" ? "исполняем ваши мечты" : "we make your dreams come true"}
                    <a href="#reg" className="button">{locale === "ru" ? "Присоединиться" : "Join"}</a>
                    <a href="https://vk.me/id257708750" className="button">{locale === "ru" ? "Связаться с нами" : "Contact us"}</a>
                    <div className="socials">
                        {socials.map((s, i) => (<>
                            <a href={s.url} target="_blank" rel="noreferrer" className="social"><i
                                className={`fa-brands fa-${s.icon}`}/></a>
                        </>))}
                    </div>
                </div>
            </section>
            <section className="bg">
                <img src="/bg.png" alt="airplane"/>
            </section>
            <section className="flights">
                {!flights.data ? (<p className="bold big">{locale === "ru" ? "Запланированных рейсов нет" : "No flights planned"}</p>) : (
                    <>
                        <p className="bold big"><i className="fa-solid fa-plane-departure"></i>⠀{locale === "ru" ? "Запланированные рейсы" : "Planned flights"}
                        </p>
                        <p className="bold"><i className="fa-solid fa-clock"></i>⠀{locale === "ru" ? "Данные обновлены сегодня в " : "Data updated today at "}{updated}</p>
                        <table>
                            <thead>
                            <tr>
                                <th>From</th>
                                <th>To</th>
                                <th>PAX</th>
                                <th>A/C</th>
                                <th>Dist</th>
                            </tr>
                            </thead>
                            <tbody id="flights">
                            {flights.data.map((flight: any) => (
                                <tr key={flight}>
                                    <td>{flight.departure}</td>
                                    <td>{flight.arrival}</td>
                                    <td>{flight.pax_economy + flight.pax_business + flight.pax_first}</td>
                                    <td>{flight.number}</td>
                                    <td>{flight.dist}nm</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </>
                )}
            </section>
            <section className="bg">
                <img src="/bg2.png" alt="airplane"/>
            </section>
            <section id="reg">
                <p className="bold big"><i className="fa-solid fa-user-plus"></i>⠀{locale === "ru" ? "Присоединись к ВАК Россия сегодня!" : "Join VA Rossiya today!"}</p>
                <p className="bold">{locale === "ru" ? "Мы будем рады видеть вас в числе наших пилотов!" : "We will be happy to see you among our pilots!"}</p>
                <form onSubmit={
                    async (e) => {
                        e.preventDefault();
                        const user = {
                            name: name.current?.value,
                            age: age.current?.value,
                            aircraft: aircraft.current?.value,
                            hours: hours.current?.value,
                            simulator: simulator.current?.value,
                            others: others.current?.value,
                            vk: vk.current?.value,
                            locale
                        }
                        const response = await fetch(`/api/submit?name=${user.name}&age=${user.age}&aircraft=${user.aircraft}&hours=${user.hours}&simulator=${user.simulator}&others=${user.others}&vk=${user.vk}`);
                        const result = await response.json();
                        const messages: any = {
                            ru: {
                                "vk_not_found": "Ваша страница ВКонтакте не найдена. Пожалуйста, проверьте правильность ссылки.",
                                "user_alredy_exists": "Пользователь с таким ВКонтакте уже существует.",
                                "reapply": "Отправлена заявление на восстановление в ВАК Россия. Пожалуйста, подождите, пока мы рассмотрим вашу заявку.",
                                "internal_error": "Произошла внутренняя ошибка. Пожалуйста, попробуйте позже.",
                                "applied": "Ваша заявка была успешно отправлена. Вся информация будет далее в беседе в которую вас добавили.",
                                "applied_no_chat": "Ваша заявка была успешно отправлена. В беседу добавить вас не удалось, пожалуйста, напишите в личные сообщения администратору."
                            },
                            en: {
                                "vk_not_found": "Your VKontakte page was not found. Please check the link.",
                                "user_alredy_exists": "A user with this VKontakte already exists.",
                                "reapply": "A request to restore your account in VA Rossiya has been sent. Please wait while we review your application.",
                                "internal_error": "An internal error occurred. Please try again later.",
                                "applied": "Your application has been successfully sent. All information will be further in the chat to which you were added.",
                                "applied_no_chat": "Your application has been successfully sent. You could not be added to the chat, please write to the administrator in private messages."
                            }
                        }
                        if (locale === "ru") openWindow("Отправка заявки", messages["ru"][result.code]);
                        else openWindow("Sending application", messages["en"][result.code]);
                    }}>
                    <p className="small bold">{locale === "ru" ? "Подать заявку" : "Submit application"}</p>
                    <div className="input-holder">
                        <p className="bold">{locale === "ru" ? "Ваше имя и фамилия" : "Your name and surname"}</p>
                        <input type="text" ref={name} required/>
                    </div>
                    <div className="input-holder">
                        <p className="bold">{locale === "ru" ? "Ваш возраст" : "Your age"}</p>
                        <input type="number" ref={age} required/>
                    </div>
                    <div className="input-holder">
                        <p className="bold">{locale === "ru" ? "На каком типе ВС вы планируете летать в нашей ВАК" : "What type of aircraft do you plan to fly in our VA"}</p>
                        <input type="text" ref={aircraft} required/>
                    </div>
                    <div className="input-holder">
                        <p className="bold">{locale === "ru" ? "Сколько часов вы летали на этом типе ВС" : "How many hours have you flown on this type of aircraft"}</p>
                        <input type="number" ref={hours} required/>
                    </div>
                    <div className="input-holder">
                        <p className="bold">{locale === "ru" ? "В каком симуляторе вы летаете" : "What simulator do you fly"}</p>
                        <input type="text" ref={simulator} required/>
                    </div>
                    <div className="input-holder">
                        <p className="bold">{locale === "ru" ? "Летали ли вы раньше в других ВАК? Если да, то в каких" : "Have you flown in other VAs before? If yes, then in which"}</p>
                        <input type="text" ref={others} required/>
                    </div>
                    <div className="input-holder">
                        <p className="bold">{locale === "ru" ? "Ваша ссылка на ВК" : "Your VK link"}</p>
                        <input type="text" ref={vk} required/>
                    </div>
                    <div className="button-holder">
                        <button type="submit" className="button">
                            <p className="bold">{locale === "ru" ? "Подать заявку" : "Submit application"}</p>
                        </button>
                    </div>
                </form>
            </section>
            {windowOpen && (
                <section id="module-window-holder" className="center">
                    <div id="module-window">
                        <div id="module-window-header">
                            <p id="module-window-title">{windowTitle}</p>
                        </div>
                        <div id="module-window-content">
                            <p id="module-window-message">{windowContent}</p>
                        </div>
                        <div id="module-window-footer">
                            <button id="module-window-button" onClick={() => setWindowOpen(false)} className="button">
                                <i className="fa-solid fa-xmark" onClick={() => setWindowOpen(false)}> </i>
                                ⠀<p className="bold">{locale === "ru" ? "Закрыть" : "Close"}</p>
                            </button>
                        </div>
                    </div>
                </section>
            )}
        </Layout>
    )
}
