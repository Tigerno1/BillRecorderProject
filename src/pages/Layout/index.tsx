import { Outlet } from "react-router-dom"
import { TabBar } from "antd-mobile"
import { useEffect} from "react"
import { useDispatch } from "react-redux"
import { getBillList } from "@/store/modules/billStore"
import { useNavigate } from "react-router-dom"

import {
  AddCircleOutline,
  CalculatorOutline,
  BillOutline,
} from 'antd-mobile-icons'
import "./index.scss"

const tabs = [
    {
      key: '/month',
      title: '阅读账单',
      icon: <BillOutline/>,
    },
    {
      key: '/new',
      title: '记账',
      icon: <AddCircleOutline />,
    },
    {
      key: '/year',
      title: '年度账单',
      icon: <CalculatorOutline />,
    },
]

const Layout = ()=>{
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getBillList());
    }, [dispatch])

    // const [activeKey, setActiveKey] = useState('todo')
    const navigate = useNavigate();
    const switchRoute = (path) => {
        navigate(path);
    }

    return (
    <div className="layout">
        <div className="container">
            <Outlet />
        </div>
        <div className="footer">
            <TabBar onChange={value => switchRoute(value)}>
                {tabs.map((item) => (
                    <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
                ))}
            </TabBar>

        </div>
    </div>
        
    )
}
export default Layout