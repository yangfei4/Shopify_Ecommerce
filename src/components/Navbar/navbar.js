import React from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.scss";

import { Dropdown, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';



const Navbar = () => {

    const navigate = useNavigate();

    return (
        <header className="navbar">
            <nav className="navbar__items">
                <div className="items-left">
                    <span className="item anchor home" onClick={()=>navigate("/home")}>
                        HOME
                    </span>
                </div>
                <div className="items-right">
                    <span className="item" onClick={()=>navigate("/")}>
                        <Dropdown menu={{ items }}>
                            {/* no text-decoration */}
                            <Space>
                                My Account
                                <DownOutlined />
                            </Space>
                        </Dropdown>
                    </span>
                    {/* cart icon from font-awsome */}
                    <span className="item anchor" onClick={() => navigate("/cart")}>
                            Cart&nbsp;
                            <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                    </span>
                </div>
            </nav>
        </header>
    );
};

const items = [
    {
      label: (
        <a target="_blank" rel="noopener noreferrer" href="/">
            My account
        </a>
      ),
      key: '0',
    },
    {
      label: (
        <a target="_blank" rel="noopener noreferrer" href="/">
            Orders
        </a>
      ),
      key: '1',
    },
    {
        label: (
            <a target="_blank" rel="noopener noreferrer" href="/">
                Wishlist
            </a>
        ),
    },
    {
      type: 'divider',
    },
    {
      label: 'Logout',
      key: '3',
      disabled: true,
    },
  ];

export default Navbar;