import { Button, DatePicker, Input, NavBar } from "antd-mobile" 
import './index.scss'
import classNames from "classnames"
import { useNavigate } from "react-router-dom"
import Icon from "../../components/Icon"
import { billListData } from "../../constants"
import { useState } from "react"
import dayjs from "dayjs"
import { addBillList } from "../../store/modules/billStore"
import { useDispatch } from "react-redux"

const New = ()=>{
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [billType, setBillType] = useState('pay')
    const [money, setMoney] = useState(0)
    const [useFor, setUseFor] = useState('')
    const [date, setDate] = useState(new Date())
    const [dateVisible, setDateVisible] = useState(false);
    const moneyChange = (value) => {
        setMoney(value)
    }
    const onSave = () => {
        // 这里应该有保存的逻辑，例如调用API接口将数据保存到服务器
        // 保存成功后，可以跳转回首页或者显示一个成功的提示
        const new_bill = {
            type: billType,
            money: billType === 'pay' ? -money : money,
            useFor: useFor,
            date: date
        }
        dispatch(addBillList(new_bill))
    }
    return (
        <div className="keepAccounts">
            <NavBar className="nav" backArrow={false} onBack={()=>navigate(-1)}>
                记一笔
            </NavBar>
            <div className="header">
                <div className="kaType">
                    <Button
                    shape="rounded"
                    className={classNames({ "selected": billType === 'pay' })} onClick={()=>setBillType('pay')}>
                        支出
                    </Button>
                    <Button 
                    shape="rounded"
                    className={classNames({ "selected": billType === 'income' })} onClick={()=>setBillType('income')}
                    >
                        收入
                    </Button>
                </div>
                <div className="kaFormWrapper">
                    <div className="kaForm">
                        <div className="date">
                            <Icon type="calendar" className="icon" />
                            <span className="text" onClick={()=>{setDateVisible(true)}}>{dayjs(date).format("YYYY-MM-DD")}</span>
                            <DatePicker 
                            className="kaDate"
                            title="记账日期"
                            max={new Date()}
                            visible={dateVisible}
                            onCancel={() => setDateVisible(false)}
                            onConfirm={(date) => {
                                setDateVisible(false)
                                // 这里可以处理选择的日期，例如保存到状态或者直接使用
                                setDate(date)

                            }}
                            onClose={()=> setDateVisible(false)}
                            />

                        </div>
                        <div className="kaInput">
                            <Input 
                            className="input"
                            placeholder="0.00" 
                            type="number"
                            value={money}
                            onChange={moneyChange}
                            />
                            <span className="iconYuan">¥</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="kaTypeList">
                {billListData[billType].map(item => {
                    return (
                        <div className="kaType" key={item.type}>
                            <div className="title">{item.name}
                                <div className="list">
                                    {item.list.map(i => {
                                        return (
                                            <div className={classNames(
                                                "item",
                                                {"selected": useFor === i.type}
                                                )} key={i.type} onClick={()=>setUseFor(i.type)}>
                                                    <div className="icon">
                                                        <Icon type={i.type}/>
                                                    </div>
                                                    <div className="text">{i.name}</div>
                                                </div>
                                            )
                                        })}
                                </div>
                            </div>
                        </div>
                    )})
                }
            </div>
            <div className="btns">
                <Button className="btn" onClick={onSave}>保存</Button>
            </div>
        </div>
    )
}
export default New 