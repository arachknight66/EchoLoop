package com.example.echoloop.ui.navigation

import androidx.compose.animation.core.tween
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.animation.slideInVertically
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.padding
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import com.example.echoloop.ui.screens.calm.CalmScreen
import com.example.echoloop.ui.screens.insights.InsightsScreen
import com.example.echoloop.ui.screens.journal.JournalArchiveScreen
import com.example.echoloop.ui.screens.journal.JournalScreen
import com.example.echoloop.ui.screens.journal.JournalViewModel
import com.example.echoloop.ui.screens.reflect.ReflectScreen
import com.example.echoloop.ui.screens.sleep.SleepScreen

@Composable
fun NavGraph(
    navController: NavHostController,
    paddingValues: PaddingValues,
    journalViewModel: JournalViewModel
) {
    NavHost(
        navController = navController,
        startDestination = Screen.Journal.route,
        modifier = Modifier.padding(paddingValues),
        enterTransition = {
            slideInVertically(
                initialOffsetY = { 12 },
                animationSpec = tween(300)
            ) + fadeIn(animationSpec = tween(300))
        },
        exitTransition = {
            fadeOut(animationSpec = tween(300))
        }
    ) {
        composable(Screen.Journal.route) { 
            JournalScreen(
                viewModel = journalViewModel,
                onNavigateToArchive = { navController.navigate(Screen.JournalArchive.route) }
            ) 
        }
        composable(Screen.Sleep.route) { SleepScreen() }
        composable(Screen.Reflect.route) { ReflectScreen() }
        composable(Screen.Insights.route) { InsightsScreen() }
        composable(Screen.Calm.route) { CalmScreen() }
        composable(Screen.JournalArchive.route) { 
            JournalArchiveScreen(
                viewModel = journalViewModel,
                onBack = { navController.popBackStack() }
            )
        }
    }
}
