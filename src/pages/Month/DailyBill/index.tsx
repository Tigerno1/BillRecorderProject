import classNames from "classnames"
import "./index.scss"
import { useMemo, useState } from "react"
import _ from "lodash"
import dayjs from "dayjs"
import Icon from "../../../components/Icon"

const DailyBill = ({ monthlyData }) => {
    
    const dailyGroup = useMemo(()=>{
            // return billList.filter(item => item.date.includes(dayjs().format("YYYY-MM")))
            return _.groupBy(monthlyData, item => dayjs(item.date).format("YYYY-MM-DD"))
        }, [monthlyData])

    const dailyResult = (data)=>{
        const pay = data
            .filter(i => i.type === 'pay')
            .reduce((s, i) => s + i.money, 0)
        const income = data   
            .filter(i => i.type === 'income')
            .reduce((s, i) => s + i.money, 0)
        const total = income + pay
        return {
            pay,
            income,
            total
        }
    }
    const [expandDate, setExpand] = useState("")

    return (
        <>
            {Object.keys(dailyGroup).map(date => {
                const data = dailyGroup[date]
                const { pay, income, total } = dailyResult(data)
                const isExpanded = expandDate === date
                return (
                    <div key = {date} className={classNames("dailyBill")}>
                        <div className="header">
                            <div className="dateIcon">
                                <span className="date">{date}</span>
                                <span 
                                    className={classNames("arrow", { expand: isExpanded })}
                                    onClick={() => setExpand(isExpanded ? "" : date)}>
                                </span>
                            </div>
                            <div className="oneLineOverview">
                                <div className="pay">
                                    <span className="type">支出</span>
                                    <span className="money">{pay.toFixed(2)}</span>
                                </div>
                                <div className="income">
                                    <span className="type">收入</span>
                                    <span className="money">{income.toFixed(2)}</span>
                                </div>
                                <div className="balance">
                                    <span className="money">{total.toFixed(2)}</span>
                                    <span className="type">结余</span>
                                </div>
                            </div>
                        </div>
                        {/* {isExpanded&&( */}
                        <div className="billList" style={{ display: isExpanded ? "block" : "none" }}>
                            {data.map(item => (
                                    <div className="bill" key={item.id}>
                                        <Icon type={item.useFor} />
                                        <div className="detail">
                                            <div className="billType">{item.useFor}</div>
                                        </div>
                                        <div className={classNames("money", item.type)}>
                                            {item.money.toFixed(2)}
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                        {/* )} */}
                    </div>
                )
            })}
                
        </>
        )
    }
export default DailyBill