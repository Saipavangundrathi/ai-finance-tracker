package com.financetracker.backend.service;

import com.financetracker.backend.dto.ExpenseResponse;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AIAnalysisService {

    private final ChatClient chatClient;

    public AIAnalysisService(ChatClient.Builder builder) {
        this.chatClient = builder.build();
    }

    public String analyzeExpenses(List<ExpenseResponse> expenses) {

        StringBuilder expenseData = new StringBuilder();
        expenses.forEach(e -> expenseData.append(
                String.format("- %s | %s | $%.2f | %s\n",
                        e.getDate(), e.getCategory(), e.getAmount(), e.getTitle())
        ));

        String prompt = """
            You are a helpful personal finance advisor.
            
            Here are the user's recent expenses:
            
            %s
            
            Please analyze these expenses and provide:
            1. A brief summary of their spending patterns
            2. Which category they are overspending in
            3. Three specific actionable saving tips based on their actual data
            4. An encouraging closing message
            
            Keep the response concise, friendly and practical.
            """.formatted(expenseData.toString());

        return chatClient.prompt()
                .user(prompt)
                .call()
                .content();
    }
}