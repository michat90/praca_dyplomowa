package pl.wszib.praca_dyplomowa.web.models;



import java.math.BigDecimal;
import java.sql.Date;

public class TransactionModel {

    private Long id;

    private BigDecimal amount;

    private Date date;

    private String category;

    private String subcategory;

    private String tag;

    private String title;
    private String userName;

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public TransactionModel () {
    }

    public TransactionModel(Long id, BigDecimal amount, Date ingredients, String category,
                            String subCategory, String tag, String title, String user) {
        this.id = id;
        this.amount = amount;
        this.date = ingredients;
        this.category = category;
        this.subcategory = subCategory;
        this.tag = tag;
        this.title = title;
        this.userName = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getSubcategory() {
        return subcategory;
    }

    public void setSubcategory(String subcategory) {
        this.subcategory = subcategory;
    }

    public String getTag() {
        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
