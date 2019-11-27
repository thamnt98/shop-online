import React from "react";
import { Route, Switch } from "react-router-dom";
import asyncComponent from "util/asyncComponent";

const App = ({ match }) => (
  <div className="gx-main-content-wrapper">
    <Switch>
      <Route
        path={`${match.url}shop`}
        exact
        component={asyncComponent(() => import("./Shop"))}
      />
      <Route
        path={`${match.url}shop/new`}
        component={asyncComponent(() => import("./Shop/New"))}
      />
      <Route
        path={`${match.url}shop/detail/:id`}
        exact
        component={asyncComponent(() => import("./Shop/Detail"))}
      />
      <Route
        path={`${match.url}shop/edit/:id`}
        component={asyncComponent(() => import("./Shop/Edit"))}
      />

      <Route
        path={`${match.url}rentals/new/:id?`}
        component={asyncComponent(() => import("./Rental/AddRentalPage"))}
      />
      <Route
        path={`${match.url}rentals/detail/:id`}
        component={asyncComponent(() => import("./Rental/RentalDetailPage"))}
      />
      <Route
        path={`${match.url}rentals`}
        component={asyncComponent(() => import("./Rental/RentalPage"))}
      />
      <Route
        path={`${match.url}color`}
        exact
        component={asyncComponent(() => import("./Color"))}
      />
      <Route
        path={`${match.url}color/new`}
        component={asyncComponent(() => import("./Color/New"))}
      />
      <Route
        path={`${match.url}color/detail/:id`}
        exact
        component={asyncComponent(() => import("./Color/Detail"))}
      />
      <Route
        path={`${match.url}color/edit/:id`}
        component={asyncComponent(() => import("./Color/Edit"))}
      />

      <Route
        path={`${match.url}rentals/new/:id?`}
        component={asyncComponent(() => import("./Rental/AddRentalPage"))}
      />
      <Route
        path={`${match.url}rentals/detail/:id`}
        component={asyncComponent(() => import("./Rental/RentalDetailPage"))}
      />
      <Route
        path={`${match.url}rentals`}
        component={asyncComponent(() => import("./Rental/RentalPage"))}
      />

      <Route
        path={`${match.url}taxs`}
        component={asyncComponent(() => import("./Tax/index"))}
      />

      <Route
        path={`${match.url}admin`}
        exact
        component={asyncComponent(() => import("./Admin/AdminPage"))}
      />

      <Route
        path={`${match.url}admin/changePassword`}
        component={asyncComponent(() => import("./Admin/ChangePasswordPage"))}
      />

      <Route
        path={`${match.url}suppliers/new/:id?`}
        component={asyncComponent(() => import("./Supplier/AddSuppliderPage"))}
      />
      <Route
        path={`${match.url}suppliers/detail/:id`}
        component={asyncComponent(() => import("./Supplier/SupplierDetail"))}
      />
      <Route
        path={`${match.url}suppliers`}
        component={asyncComponent(() => import("./Supplier/SupplierPage"))}
      />

      <Route
        exact
        path={`${match.url}sizes`}
        component={asyncComponent(() => import("./Size/SizePage"))}
      />

      <Route
        exact
        path={`${match.url}sizes/news`}
        component={asyncComponent(() => import("./Size/SizeAddPage"))}
      />

      <Route
        path={`${match.url}sizes/edit/:id`}
        component={asyncComponent(() => import("./Size/SizeEditPage"))}
      />

      <Route
        path={`${match.url}sizes/detail/:id`}
        component={asyncComponent(() => import("./Size/SizeDetailPage"))}
      />
      <Route
        path={`${match.url}shop`}
        exact
        component={asyncComponent(() => import("./Shop"))}
      />
      <Route
        path={`${match.url}shop/new`}
        component={asyncComponent(() => import("./Shop/New"))}
      />
      <Route
        path={`${match.url}shop/detail/:id`}
        exact
        component={asyncComponent(() => import("./Shop/Detail"))}
      />
      <Route
        path={`${match.url}shop/edit/:id`}
        component={asyncComponent(() => import("./Shop/Edit"))}
      />
      <Route
        path={`${match.url}service`}
        exact
        component={asyncComponent(() => import("./Service/ServicePage"))}
      />
      <Route
        path={`${match.url}service/new`}
        component={asyncComponent(() => import("./Service/AddService"))}
      />
      <Route
        path={`${match.url}service/edit/:id`}
        component={asyncComponent(() => import("./Service/EditService"))}
      />
      <Route
        path={`${match.url}service/detail/:id`}
        component={asyncComponent(() => import("./Service/DetailService"))}
      />

      <Route
        path={`${match.url}staffs/new/:id?`}
        component={asyncComponent(() => import("./Staff/AddStaffPage"))}
      />
      <Route
        path={`${match.url}staffs/detail/:id`}
        component={asyncComponent(() => import("./Staff/StaffDetailPage"))}
      />
      <Route
        path={`${match.url}staffs/changePassword/:id`}
        component={asyncComponent(() => import("./Staff/ChangePasswordPage"))}
      />
      <Route
        path={`${match.url}staffs`}
        component={asyncComponent(() => import("./Staff/StaffPage"))}
      />

      <Route
        path={`${match.url}producers`}
        exact
        component={asyncComponent(() => import("./Producer/ProducerPage"))}
      />
      <Route
        path={`${match.url}producers/new`}
        component={asyncComponent(() => import("./Producer/ProducerAddPage"))}
      />
      <Route
        path={`${match.url}producers/edit/:id`}
        component={asyncComponent(() => import("./Producer/ProducerEditPage"))}
      />
      <Route
        path={`${match.url}producers/detail/:id`}
        component={asyncComponent(() =>
          import("./Producer/ProducerDetailPage")
        )}
      />

      <Route
        path={`${match.url}products/history/:id`}
        component={asyncComponent(() =>
          import("./Product/ProductHistoryPage")
        )}
      />
      <Route
        path={`${match.url}products/edit-copy/:id`}
        component={asyncComponent(() =>
          import("./Product/CopyProductPage")
        )}
      />
      <Route
        path={`${match.url}products/copy/:id`}
        exact
        component={asyncComponent(() =>
          import("./Product/CopyProductPage")
        )}
      />
      <Route
        path={`${match.url}products/edit/:id`}
        component={asyncComponent(() =>
          import("./Product/AddProductPage")
        )}
      />
      <Route
        path={`${match.url}products/new/:id?`}
        component={asyncComponent(() =>
          import("./Product/AddProductPage")
        )}
      />
      <Route
        path={`${match.url}products/detail/:id`}
        component={asyncComponent(() =>
          import("./Product/ProductDetailPage")
        )}
      />
      <Route
        path={`${match.url}products`}
        component={asyncComponent(() =>
          import("./Product/ProductPage")
        )}
      />

      <Route component={asyncComponent(() => import("./NotFoundPage"))} />
    </Switch>
  </div>
);

export default App;
