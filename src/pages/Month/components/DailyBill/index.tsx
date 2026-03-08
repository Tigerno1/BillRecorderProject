import classNames from "classnames"
import "./index.scss"
import { useMemo } from "react"
import _ from "lodash"
import dayjs from "dayjs"

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

    return (
        <div className={classNames("dailyBill")}>
            <div className="header">
                <div className="dateIcon">
                    <span className="date">{"03月23日"}</span>
                    <span className={classNames("arrow")}></span>
                </div>
            </div>
            {Object.keys(dailyGroup).map(date => {
                const data = dailyGroup[date]
                const { pay, income, total } = dailyResult(data)
                return (
                    <div key={date} className="oneLineOverview">
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
                    </div>)})}
        </div>
    )
}

export default DailyBill