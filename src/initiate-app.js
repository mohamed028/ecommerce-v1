import connection_db from '../db/connection.js'
import { Error_handel } from "./middleware/Global-response.js";
import * as routers from "./modules/index.routes.js";

export const initiateApp = (app, express) => {
  
    const port = process.env.PORT;
  
    app.use(express.json());
  
    app.use("/user", routers.user_router);
    app.use('/category', routers.category_router);
    app.use('/subcategory',routers.subCategory_router)
    app.use('/brand',routers.brand_router)

  
    app.use(Error_handel("dev"));

  
    connection_db();
  
    app.listen(port, () => {
    console.log("Server Is Running");
  });
};
