package com.example.echoloop

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.Scaffold
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.compose.rememberNavController
import com.example.echoloop.ui.components.BottomNavigationBar
import com.example.echoloop.ui.navigation.NavGraph
import com.example.echoloop.ui.screens.auth.LoginScreen
import com.example.echoloop.ui.screens.journal.JournalViewModel
import com.example.echoloop.ui.theme.ECHOLOOPTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            ECHOLOOPTheme {
                var isLoggedIn by remember { mutableStateOf(false) }
                
                if (isLoggedIn) {
                    val journalViewModel: JournalViewModel = viewModel()
                    val navController = rememberNavController()
                    Scaffold(
                        modifier = Modifier.fillMaxSize(),
                        bottomBar = { BottomNavigationBar(navController) }
                    ) { innerPadding ->
                        NavGraph(
                            navController = navController, 
                            paddingValues = innerPadding,
                            journalViewModel = journalViewModel
                        )
                    }
                } else {
                    LoginScreen(
                        onLoginSuccess = { isLoggedIn = true },
                        onNavigateToSignup = { /* Handle signup navigation if needed */ }
                    )
                }
            }
        }
    }
}
