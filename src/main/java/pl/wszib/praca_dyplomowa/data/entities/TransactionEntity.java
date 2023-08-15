package pl.wszib.praca_dyplomowa.data.entities;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.sql.Date;


@Entity
@Table(name = "transaction")
public class TransactionEntity {
    @Id
    @GeneratedValue
    @Column(name = "id")
    private Long id;
    @Column(name = "Amount")
    private BigDecimal amount;
    @Column(name = "Date")
    private Date date;
    @Column(name = "Category")
    private String category;
    @Column(name = "Subcategory")
    private String subcategory;
    @Column(name = "Tag")
    private String tag;
    @Column(name = "Title")
    private String title;
    private String userName;

    public String getUserName() {
        return userName;
    }

    public void setUserName(String user) {
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

    public void setDate(Date ingredients) {
        this.date = ingredients;
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

    public void setSubcategory(String subCategory) {
        this.subcategory = subCategory;
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
