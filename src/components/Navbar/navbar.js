import React from "react";
import "./navbar.scss";

import { Dropdown, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';



const Navbar = () => {

    return (
        <header className="navbar">
            <nav className="navbar__items">
                <div className="items-left">
                    <span className="item">
                        <a className="home" href="/">HOME</a>
                    </span>
                </div>
                <div className="items-right">
                    <span className="item">
                        <Dropdown menu={{ items }}>
                            {/* no text-decoration */}
                            <a onClick={(e) => e.preventDefault()}>
                            <Space>
                                My Account
                                <DownOutlined />
                            </Space>
                            </a>
                        </Dropdown>
                    </span>
                    {/* cart icon from font-awsome */}
                    <span className="item">
                        <a href="/cart">
                            Cart&nbsp;
                            <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                        </a>
                    </span>
                </div>
            </nav>
        </header>
    );
};

const items = [
    {
      label: (
        <a target="_blank" rel="noopener noreferrer" href="">
            My account
        </a>
      ),
      key: '0',
    },
    {
      label: (
        <a target="_blank" rel="noopener noreferrer" href="">
            Orders
        </a>
      ),
      key: '1',
    },
    {
        label: (
            <a target="_blank" rel="noopener noreferrer" href="">
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