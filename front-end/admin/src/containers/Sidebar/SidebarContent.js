import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import CustomScrollbars from "util/CustomScrollbars";
import SidebarLogo from "./SidebarLogo";
import Auxiliary from "util/Auxiliary";
import UserProfile from "./UserProfile";
import AppsNavigation from "./AppsNavigation";
import {
  NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
  THEME_TYPE_LITE
} from "../../constants/ThemeSetting";
import { Menu, Icon } from "antd";

const { SubMenu } = Menu;
const MenuItemGroup = Menu.ItemGroup;

class SidebarContent extends Component {
  state = {
    openKeys: ['1'],
  };
  onOpenChange = openKeys => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
  };
  getNoHeaderClass = navStyle => {
    if (
      navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR ||
      navStyle === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR
    ) {
      return "gx-no-header-notifications";
    }
    return "";
  };
  getNavStyleSubMenuClass = navStyle => {
    if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR) {
      return "gx-no-header-submenu-popup";
    }
    return "";
  };
  render() {
    const { themeType, navStyle, pathname } = this.props;
    const selectedKeys = pathname.substr(1);
    const defaultSelectKeys = selectedKeys.split("/")[0];
    return (
      <Auxiliary>
        <SidebarLogo />
        <div className="gx-sidebar-content">
          <div
            className={`gx-sidebar-notifications ${this.getNoHeaderClass(
              navStyle
            )}`}
          >
            <UserProfile />
            <AppsNavigation />
          </div>
          <CustomScrollbars className="gx-layout-sider-scrollbar">
            <Menu
              openKeys={this.state.openKeys}
              onOpenChange={this.onOpenChange}
              selectedKeys={[defaultSelectKeys]}
              defaultSelectedKeys={[defaultSelectKeys]}
              theme={themeType === THEME_TYPE_LITE ? "lite" : "dark"}
              mode="inline"
              style={{ width: 256 }}
            >
              <MenuItemGroup key="main" className="gx-menu-group">
                <SubMenu
                  key="administration"
                  title={
                    <span>
                      <i className="icon icon-user" />
                      <span>Administrator</span>
                    </span>
                  }
                >
                  <Menu.Item key="admin">
                    <Link id="admin" to="/admin">
                      <i className="icon icon-user" />
                      Administrator
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="service">
                    <Link id="service" to="/service">
                      <i className="icon icon-product-list" />
                      Sevrice
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="rentals">
                    <Link to="/rentals">
                      <i className="icon icon-product-list" />
                      Rental
                    </Link>
                  </Menu.Item>
                </SubMenu>
                <SubMenu
                  key="good"
                  title={
                    <span>
                      <i className="icon icon-product-list" />
                      <span> Good Manager</span>
                    </span>
                  }
                >
                  <Menu.Item key="products">
                    <Link to="/products">
                      <i className="icon icon-default-timeline" />
                      Goods manage
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="taxs">
                    <Link to="/taxs">
                      <i className="icon icon-default-timeline" />
                      Tax
                    </Link>
                  </Menu.Item>

                  <Menu.Item key="color">
                    <Link to="/color">
                      <i className="icon icon-product-list" />
                      Color
                    </Link>
                  </Menu.Item>

                  <Menu.Item key="suppliers">
                    <Link to="/suppliers">
                      <i className="icon icon-product-list" />
                      Supplier
                    </Link>
                  </Menu.Item>

                  <Menu.Item key="sizes">
                    <Link to="/sizes">
                      <i className="icon icon-product-list" />
                      Size
                    </Link>
                  </Menu.Item>

                  <Menu.Item key="producers">
                    <Link to="/producers">
                      <i className="icon icon-product-list" />
                      Producer
                    </Link>
                  </Menu.Item>
                </SubMenu>
                <Menu.Item key="shop">
                  <Link to="/shop">
                    <i className="icon icon-shopping-cart" />
                    <span> Shop</span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="staffs">
                  <Link to="/staffs">
                    <i className="icon icon-wall" />
                    <span> Staff</span>
                  </Link>
                </Menu.Item>
              </MenuItemGroup>
            </Menu>
          </CustomScrollbars>
        </div>
      </Auxiliary>
    );
  }
}

SidebarContent.propTypes = {};
const mapStateToProps = ({ settings }) => {
  const { navStyle, themeType, locale, pathname } = settings;
  return { navStyle, themeType, locale, pathname };
};
export default connect(mapStateToProps)(SidebarContent);
