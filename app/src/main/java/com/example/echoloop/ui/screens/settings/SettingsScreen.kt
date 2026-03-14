package com.example.echoloop.ui.screens.settings

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.echoloop.ui.theme.Black
import com.example.echoloop.ui.theme.SoftBeige15
import com.example.echoloop.ui.theme.White70

@Composable
fun SettingsScreen() {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Black)
            .padding(24.dp)
    ) {
        Text(
            text = "Settings",
            color = Color.White,
            fontSize = 28.sp,
            fontWeight = FontWeight.Light,
            modifier = Modifier.padding(top = 48.dp, bottom = 32.dp)
        )

        Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
            SettingsItem("Dark Mode", "Always On")
            SettingsItem("Notifications", "Mindful Reminders")
            SettingsItem("Data Privacy", "Encrypted & Local")
            SettingsItem("About ECHOLOOP", "v1.0.0")
        }
        
        Spacer(modifier = Modifier.weight(1f))
        
        TextButton(
            onClick = { /* Logout */ },
            modifier = Modifier.align(Alignment.CenterHorizontally)
        ) {
            Text("Logout of Space", color = Color.Red.copy(alpha = 0.7f))
        }
    }
}

@Composable
fun SettingsItem(title: String, subtitle: String) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(16.dp))
            .background(SoftBeige15)
            .padding(20.dp),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.CenterVertically
    ) {
        Column {
            Text(title, color = Color.White, fontSize = 16.sp)
            Text(subtitle, color = White70, fontSize = 12.sp)
        }
    }
}
