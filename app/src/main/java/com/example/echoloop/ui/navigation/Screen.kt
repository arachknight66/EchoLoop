package com.example.echoloop.ui.navigation

import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ChatBubbleOutline
import androidx.compose.material.icons.filled.Edit
import androidx.compose.material.icons.filled.Insights
import androidx.compose.material.icons.filled.Nightlight
import androidx.compose.material.icons.filled.SelfImprovement
import androidx.compose.ui.graphics.vector.ImageVector

sealed class Screen(val route: String, val title: String, val icon: ImageVector? = null) {
    object Journal : Screen("journal", "Journal", Icons.Default.Edit)
    object Sleep : Screen("sleep", "Sleep", Icons.Default.Nightlight)
    object Reflect : Screen("reflect", "Reflect", Icons.Default.ChatBubbleOutline)
    object Insights : Screen("insights", "Insights", Icons.Default.Insights)
    object Calm : Screen("calm", "Calm", Icons.Default.SelfImprovement)
    
    object Login : Screen("login", "Login")
    object Signup : Screen("signup", "Signup")
    object Profile : Screen("profile", "Profile")
    object Settings : Screen("settings", "Settings")
    object JournalArchive : Screen("journal_archive", "Archive")
}

val bottomNavItems = listOf(
    Screen.Journal,
    Screen.Sleep,
    Screen.Reflect,
    Screen.Insights,
    Screen.Calm
)
