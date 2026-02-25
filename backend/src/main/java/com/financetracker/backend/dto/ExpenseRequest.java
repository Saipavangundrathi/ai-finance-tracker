package com.financetracker.backend.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public class ExpenseRequest {

    private String title;
    private BigDecimal amount;
    private String category;
    private LocalDate date;
    private String note;

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    public String getNote() { return note; }
    public void setNote(String note) { this.note = note; }
}