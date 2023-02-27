package com.example.demo.serviceimpl;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.example.demo.dao.BookDao;
import com.example.demo.dao.ChartDao;
import com.example.demo.dao.OrderDao;
import com.example.demo.entity.Books;
import com.example.demo.entity.Charts;
import com.example.demo.entity.OrderItems;
import com.example.demo.entity.Orders;
import com.example.demo.service.OrderService;
import org.springframework.aop.framework.AopContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;


import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@EnableAspectJAutoProxy(proxyTargetClass = true, exposeProxy = true)
public class OrderServiceImpl implements OrderService {

    @Autowired
    OrderDao orderDao;

    @Autowired
    BookDao bookDao;

    @Autowired
    ChartDao chartDao;

    @Override
    public JSONObject AddOneOrder(JSONObject info){
        Integer userId = info.getInteger("userId");
        Integer bookId = info.getInteger("bookId");
        Integer number = info.getInteger("number");
        String orderState = info.getString("OrderState");
        Books book = bookDao.findOneById(bookId);
        BigDecimal price = book.getPrice();
        price = price.multiply(BigDecimal.valueOf(number));

        //减少书的库存
        Integer inventory = bookDao.getInventoryById(bookId);
        if (inventory<number){
            JSONObject result = new JSONObject();
            result.put("status","下单失败，书的库存不足！");
            result.put("userId",userId);
            return result;
        }
        else{
            inventory=inventory-number;
            bookDao.changeInventory(bookId,inventory);

            //在order中放置数据
            Orders newOrder = new Orders();
            newOrder.setOrder_user(userId);
            newOrder.setOrder_price(price);
            newOrder.setOrder_state(orderState);
            SimpleDateFormat formatter= new SimpleDateFormat("yyyy-MM-dd 'at' HH:mm:ss z");
            Date date = new Date(System.currentTimeMillis());
            newOrder.setOrder_date(date);
//            orderDao.saveOrder(newOrder);

            //在orderItem中放入数据
            OrderItems newItem = new OrderItems();
            newItem.setBook_id(bookId);
            newItem.setNumber(number);
//            orderDao.saveOrderItem(newItem);

            ((OrderService) AopContext.currentProxy()).createOneOrder(newOrder,newItem);

            JSONObject result = new JSONObject();
            result.put("status","下单成功! 订单号为"+newOrder.getOrder_id());
            result.put("userId",userId);
            return result;
        }
    }

    //2022/9/21为了解决死锁，回滚问题，拆分下订单的逻辑
    @Override
    @Transactional
    public void createOneOrder(Orders order, OrderItems orderItems){
        //插入order
        orderDao.saveOrder(order);

        //插入orderItem
        orderItems.setOrder_id(order.getOrder_id());
        orderDao.saveOrderItem(orderItems);
//        try{
//            orderDao.saveOrderItem(orderItems);
//        }
//        catch (Exception e){
//
//        }
    }

    @Override
    public List<Orders> GetOrders(JSONObject info){
        Integer userId = info.getInteger("userId");
        List<Orders> orders = orderDao.getOrders(userId);
        return orders;
    }

    @Override
    public List<Orders> GetAllOrders(){ return orderDao.GetAllOrders(); }

    @Override
    public List<JSONObject> GetOrderDetails(JSONObject info){ return orderDao.GetOrderDetails(info); }

    @Override
    public List<JSONObject> GetBookSales(){ return orderDao.GetBookSales();}

    @Override
    public List<JSONObject> GetUserConsumption(){ return orderDao.GetUserConsumption();}

    @Override
    public List<JSONObject> FilterTime(JSONObject info){
        String StrDate1 = info.getString("date1");
        String StrDare2 = info.getString("date2");
        SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy-MM-dd");
        Date Date1 = null;
        Date Date2 = null;

        try {
            Date1 = sdf1.parse(StrDate1);
            Date2 = sdf1.parse(StrDare2);
        }catch (Exception e){
            e.printStackTrace();
        }

        List<JSONObject> newObject = orderDao.filterTime(Date1,Date2);

        return newObject;
    }


    @Override
    public List<JSONObject> FilterBookByTime(JSONObject info){
        String StrDate1 = info.getString("date1");
        String StrDare2 = info.getString("date2");
        SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy-MM-dd");
        Date Date1 = null;
        Date Date2 = null;

        try {
            Date1 = sdf1.parse(StrDate1);
            Date2 = sdf1.parse(StrDare2);
        }catch (Exception e){
            e.printStackTrace();
        }

        List<JSONObject> newObject = orderDao.filterBookByTime(Date1,Date2);

        return newObject;
    }

    @Override
    public JSONObject addToOrder(JSONObject info) {
        //关于chartId的准备
        String StrCartIds = info.getString("cartIds");
        StrCartIds = StrCartIds.substring(1,StrCartIds.length()-1);
        String[] StrIds = StrCartIds.split(",");
        List<Integer> CartIds = new ArrayList<Integer>();
        Integer size = StrIds.length;
        for (Integer i=0;i<size;++i){
            String StrTmp = StrIds[i];
            Integer tmp=Integer.parseInt(StrTmp);
            CartIds.add(tmp);
        }

        //关于其它参数需要的准备
        Integer userId = info.getInteger("userId");
        String orderState = info.getString("orderState");
        BigDecimal price = BigDecimal.valueOf(0);

        //验证库存
        for (int i=0; i<CartIds.size(); ++i){
            Integer cartId = CartIds.get(i);
            Charts item = chartDao.findByCartId(cartId);
            Books book = bookDao.findOneById(item.getBookId());
            if (item.getNumber()>book.getInventory()){
                JSONObject result = new JSONObject();
                String StrStatus = "购买失败,《"+ book.getName() + "》的库存不足！";
                result.put("status",StrStatus);
                result.put("userId",userId);
                return result;
            }
        }
        //设置Order
        Orders newOrder = new Orders();
        newOrder.setOrder_user(userId);
        newOrder.setOrder_state(orderState);
        SimpleDateFormat formatter= new SimpleDateFormat("yyyy-MM-dd 'at' HH:mm:ss z");
        Date date = new Date(System.currentTimeMillis());
        newOrder.setOrder_date(date);

        List<OrderItems> oi = new ArrayList<>();
        //算price，并且减库存
        for (int i=0; i<CartIds.size(); ++i){
            Integer cartId = CartIds.get(i);
            Charts item = chartDao.findByCartId(cartId);
            Books book = bookDao.findOneById(item.getBookId());
            Integer inventory = book.getInventory()-item.getNumber();
            bookDao.changeInventory(book.getBook_id(),inventory);
            BigDecimal unitPrice = book.getPrice();
            unitPrice = unitPrice.multiply(BigDecimal.valueOf(item.getNumber()));
            price = price.add(unitPrice);

            //形成一个orderItem List
            OrderItems newItem = new OrderItems();
            newItem.setBook_id(book.getBook_id());
            newItem.setNumber(item.getNumber());
            oi.add(newItem);
        }

        newOrder.setOrder_price(price);

        ((OrderService) AopContext.currentProxy()).createOrders(newOrder,oi);
//        orderDao.saveOrder(newOrder);
//        Integer orderId = newOrder.getOrder_id();
//
//        //存orderItem
//        for (int i=0; i<CartIds.size(); ++i){
//            Integer cartId = CartIds.get(i);
//            Charts item = chartDao.findByCartId(cartId);
//            Books book = bookDao.findOneById(item.getBookId());
//            OrderItems newItem = new OrderItems();
//            newItem.setOrder_id(orderId);
//            newItem.setBook_id(book.getBook_id());
//            newItem.setNumber(item.getNumber());
//            orderDao.saveOrderItem(newItem);
//        }

        //删除cart
        //删除放入订单中的购物车的数据
        for (int i=0;i<CartIds.size();++i){
            Integer tmp=CartIds.get(i);
            chartDao.deleteById(tmp);
        }


        //返回插入是否成功
        JSONObject result = new JSONObject();
        result.put("status","下单成功! 订单号为"+newOrder.getOrder_id());
        result.put("userId",userId);
        return result;
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED)
    public void createOrders(Orders order, List<OrderItems> oi){
        orderDao.saveOrder(order);
        Integer orderId = order.getOrder_id();

        //设置orderItem的orderId
        for (int i=0; i<oi.size();++i){
            oi.get(i).setOrder_id(orderId);
        }
        orderDao.saveItemList(oi);
//        try{
//            orderDao.saveItemList(oi);
//        }
//        catch (Exception e){
//
//        }

    }

    @Override
    public List<JSONObject> FilterAllOrderByTime(JSONObject info){
        //转换时间
        String StrDate1 = info.getString("date1");
        String StrDare2 = info.getString("date2");
        SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy-MM-dd");
        Date Date1 = null;
        Date Date2 = null;

        try {
            Date1 = sdf1.parse(StrDate1);
            Date2 = sdf1.parse(StrDare2);
        }catch (Exception e){
            e.printStackTrace();
        }

        //数据库搜索
        List<JSONObject> newObject = orderDao.FilterAllOrderByTime(Date1,Date2);

        return newObject;
    }

    @Override
    public List<JSONObject> FilterUserOrderByTime(JSONObject info){
        //转换时间
        String StrDate1 = info.getString("date1");
        String StrDare2 = info.getString("date2");
        Integer userId = info.getInteger("userId");
        SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy-MM-dd");
        Date Date1 = null;
        Date Date2 = null;

        try {
            Date1 = sdf1.parse(StrDate1);
            Date2 = sdf1.parse(StrDare2);
        }catch (Exception e){
            e.printStackTrace();
        }

        //数据库搜索
        List<JSONObject> newObject = orderDao.FilterUserOrderByTime(Date1,Date2,userId);

        return newObject;

    }

    @Override
    public JSONObject GetBookSalesById(JSONObject info){
        Integer userId = info.getInteger("userId");
        List<JSONObject> BookList = orderDao.GetBookSalesById(userId);
        BigDecimal totalPrice = BigDecimal.valueOf(0);
        Integer totalNum = 0;
        for (int i=0;i<BookList.size();++i){
            JSONObject book = BookList.get(i);
            totalPrice = totalPrice.add(book.getBigDecimal("price"));
            totalNum = totalNum + book.getInteger("number");
        }
        JSONObject newObject = new JSONObject();
        newObject.put("data",BookList);
        newObject.put("totalPrice",totalPrice);
        newObject.put("totalNum",totalNum);
        return newObject;
    }

    @Override
    public JSONObject FilterUserBookByTime(JSONObject info){
        //转换时间
        String StrDate1 = info.getString("date1");
        String StrDare2 = info.getString("date2");
        Integer userId = info.getInteger("userId");
        SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy-MM-dd");
        Date Date1 = null;
        Date Date2 = null;

        try {
            Date1 = sdf1.parse(StrDate1);
            Date2 = sdf1.parse(StrDare2);
        }catch (Exception e){
            e.printStackTrace();
        }

        //数据库查询
        List<JSONObject> BookList = orderDao.FilterUserBookByTime(Date1,Date2,userId);
        BigDecimal totalPrice = BigDecimal.valueOf(0);
        Integer totalNum = 0;
        for (int i=0;i<BookList.size();++i){
            JSONObject book = BookList.get(i);
            totalPrice = totalPrice.add(book.getBigDecimal("price"));
            totalNum = totalNum + book.getInteger("number");
        }
        JSONObject newObject = new JSONObject();
        newObject.put("data",BookList);
        newObject.put("totalPrice",totalPrice);
        newObject.put("totalNum",totalNum);
        return newObject;
    }
}
