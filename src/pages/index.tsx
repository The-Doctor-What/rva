import {Layout} from "../components";
import {useEffect, useRef, useState} from "react";
import moment from "moment";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

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

    function openWindow(title: string, content: string) {
        setWindowOpen(true)
        setWindowTitle(title)
        setWindowContent(content)
    }

    useEffect(() => {
        fetch('/api/flights').then(r => r.json()).then(r => setFlights(r))
    }, [])

    const updated = moment(flights.updated).format('HH:mm')

    return (
        <Layout title="Главная">
            <section className="text">
                <p>
                    Мы - виртуальная авиакомпания Россия. Ежедневно мы перевозим более 1000 человек в разные города. Мы
                    имеем обширный флот от Airbus A319 до Boeing 747-400
                </p>
                <div className="bold">
                    Rossiya Virtual Airline - исполняем ваши мечты
                    <a href="#reg" className="button">Присоединиться</a>
                    <a href="https://vk.me/id257708750" className="button">Связаться с нами</a>
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
                {!flights.data ? (<p className="bold big">Запланированных рейсов нет</p>) : (
                    <>
                        <p className="bold big"><i className="fa-solid fa-plane-departure"></i>⠀Запланированные рейсы
                        </p>
                        <p className="bold"><i className="fa-solid fa-clock"></i>⠀Данные обновлены сегодня в {updated}</p>
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
                <p className="bold big">Присоединись к ВАК Россия сегодня!</p>
                <p className="bold">Мы будем рады видеть вас в числе наших пилотов!</p>
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
                            vk: vk.current?.value
                        }
                        const response = await fetch(`/api/submit?name=${user.name}&age=${user.age}&aircraft=${user.aircraft}&hours=${user.hours}&simulator=${user.simulator}&others=${user.others}&vk=${user.vk}`);
                        const result = await response.json();
                        openWindow('Отправка заявки', result.message);
                    }}>
                    <p className="small bold">Подать заявку</p>
                    <div className="input-holder">
                        <p className="bold">Ваше имя и фамилия</p>
                        <input type="text" ref={name} placeholder="Имя Фамилия" required/>
                    </div>
                    <div className="input-holder">
                        <p className="bold">Ваш возраст</p>
                        <input type="number" ref={age} placeholder="Возраст" required/>
                    </div>
                    <div className="input-holder">
                        <p className="bold">На каком типе ВС вы планируете летать в нашей ВАК</p>
                        <input type="text" ref={aircraft} placeholder="Тип ВС" required/>
                    </div>
                    <div className="input-holder">
                        <p className="bold">Сколько у вас часов налёта в авиа симуляторах</p>
                        <input type="number" ref={hours} placeholder="Часы" required/>
                    </div>
                    <div className="input-holder">
                        <p className="bold">В каком симуляторе вы летаете</p>
                        <input type="text" ref={simulator} placeholder="Симулятор" required/>
                    </div>
                    <div className="input-holder">
                        <p className="bold">Летали ли вы раньше в других ВАК? Если да, то в каких</p>
                        <input type="text" ref={others} placeholder="Другие ВАК"/>
                    </div>
                    <div className="input-holder">
                        <p className="bold">Ссылка на ваш профиль в ВК</p>
                        <input type="text" ref={vk} placeholder="Ссылка" required/>
                    </div>
                    <div className="button-holder">
                        <button type="submit" className="button">
                            Подать
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
                                ⠀Закрыть
                            </button>
                        </div>
                    </div>
                </section>
            )}
            <footer>
                <img src={'/vatsim.png'} alt="vatsim" onClick={() => window.open('https://vatsim.net')}/>
            </footer>
        </Layout>
    )
}
