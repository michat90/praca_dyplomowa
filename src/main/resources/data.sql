INSERT INTO Categories (id, category, color,operation_type)
VALUES (10000, 'Food','RGB(100,100,100)','expence'),
       (10001, 'House','RGB(100,100,100)','expence'),
       (10002, 'Car','RGB(100,100,100)','expence');

 INSERT INTO Subcategories (id, category_id, subcategory,color,operation_type)
 VALUES (10000, 10000, 'Food General','RGB(100,100,100)','expence'),
        (10001, 10000, 'Food','RGB(100,100,100)','expence'),
        (10002, 10001, 'House General','RGB(100,100,100)','expence');



