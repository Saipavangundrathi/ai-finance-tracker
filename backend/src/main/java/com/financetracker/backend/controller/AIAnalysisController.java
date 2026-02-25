package com.financetracker.backend.controller;

import com.financetracker.backend.dto.ExpenseResponse;
import com.financetracker.backend.service.AIAnalysisService;
import com.financetracker.backend.service.ExpenseService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class AIAnalysisController {

    private final AIAnalysisService aiAnalysisService;
    private final ExpenseService expenseService;

    public AIAnalysisController(AIAnalysisService aiAnalysisService, ExpenseService expenseService) {
        this.aiAnalysisService = aiAnalysisService;
        this.expenseService = expenseService;
    }

    @PostMapping("/analyze")
    public ResponseEntity<String> analyzeExpenses() {
        List<ExpenseResponse> expenses = expenseService.getAllExpenses();

        if (expenses.isEmpty()) {
            return ResponseEntity.badRequest().body("No expenses found to analyze.");
        }

        String analysis = aiAnalysisService.analyzeExpenses(expenses);
        return ResponseEntity.ok(analysis);
    }
}