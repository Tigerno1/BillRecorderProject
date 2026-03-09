import { NavBar, DatePicker } from "antd-mobile"
import { useState, useMemo, useEffect } from "react"
import { useSelector } from "react-redux"
import  dayjs from "dayjs"
import classNames from "classnames"
import './index.scss'
import _ from "lodash"
import DailyBill from "./DailyBill"

const Month = ()=>{
    const billList = useSelector(state => state.bill.billList)
    const monthGroup = useMemo(()=>{
        // return billList.filter(item => item.date.includes(dayjs().format("YYYY-MM")))
        return _.groupBy(billList, item => dayjs(item.date).format("YYYY-MM"))
    }, [billList])


    const [dateVisible, setDateVisible] = useState(false);
    const [date, setDate] = useState(dayjs().format("YYYY-MM"));
    const [monthlyData, setMonthlyData] = useState([]);

    const onConfirm = (value) => {
        setDateVisible(false);
        // 处理确认逻辑，例如获取选中的日期并更新状态
        const new_date = dayjs(value).format("YYYY-MM");
        setDate(new_date);
        const new_monthly_data = monthGroup[new_date] || [];
        setMonthlyData(new_monthly_data);
    }

    useEffect(() => {
        //一上来就渲染一次, 当billList更新时，重新计算当前月的数据
        const current_date = dayjs().format("YYYY-MM")
        const monthlyData = monthGroup[current_date] || [];
        setMonthlyData(monthlyData)}, [monthGroup])
            
    const { pay, income, total } = useMemo(() => {
        const pay = monthlyData
            .filter(i => i.type === 'pay')
            .reduce((s, i) => s + i.money, 0)
        const income = monthlyData   
            .filter(i => i.type === 'income')
            .reduce((s, i) => s + i.money, 0)
        const total = income + pay
        return {
            pay,
            income,
            total
        }}, [monthlyData])

    return (
    <div className="monthlyBill">
        <NavBar className="nav" backArrow={false}>
            月度收支
        </NavBar>
        <div className="content">
            <div className="header">
                <div className="date" onClick={()=>setDateVisible(true)}>
                    <span className="text">
                        {date + "月账单"}
                    </span>
                    <span className={classNames("arrow", {expand: dateVisible})}></span>
                </div>
                {/* 统计区域 */}
                <div className="twoLineOverview">
                    <div className="item">
                        <span className="money">{pay.toFixed(2)}</span>
                        <span className="type">支出</span>
                    </div>
                    <div className="item">
                        <span className="money">{income.toFixed(2)}</span>
                        <span className="type">收入</span>
                    </div>
                    <div className="item">
                        <span className="money">{total.toFixed(2)}</span>
                        <span className="type">结余</span>
                    </div>
                </div>
                {/* 时间选择器 */}
                <DatePicker
                    className="kaData"
                    title="记账日期"
                    precision="month"
                    visible={dateVisible}
                    onCancel={() => setDateVisible(false)}
                    onConfirm={onConfirm}
                    onClose={()=> setDateVisible(false)}
                    max={new Date()}
                />
            </div>
            <DailyBill monthlyData = {monthlyData}/>
        </div>

    </div>
    )
}

export default Month 
