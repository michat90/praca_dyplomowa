package pl.wszib.praca_dyplomowa.web.models;



import java.math.BigDecimal;
import java.util.Date;

public class TransactionModel {

    private Long id;

    private BigDecimal amount;

    private Date date;

    private String category;

    private String subCategory;

    private String tag;

    private String title;

    public TransactionModel () {
    }

    public TransactionModel(Long id, BigDecimal amount, Date ingredients, String category, String subCategory, String tag, String title) {
        this.id = id;
        this.amount = amount;
        this.date = ingredients;
        this.category = category;
        this.subCategory = subCategory;
        this.tag = tag;
        this.title = title;
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

    public String getSubCategory() {
        return subCategory;
    }

    public void setSubCategory(String subCategory) {
        this.subCategory = subCategory;
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
