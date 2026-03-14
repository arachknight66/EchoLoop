package com.example.echoloop.ui.screens.auth

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.echoloop.ui.theme.Black
import com.example.echoloop.ui.theme.SoftBeige
import com.example.echoloop.ui.theme.SoftBeige25
import com.example.echoloop.ui.theme.White70

@Composable
fun SignupScreen(onSignupSuccess: () -> Unit, onNavigateToLogin: () -> Unit) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Black)
            .padding(24.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Text(
            text = "Join ECHOLOOP",
            color = Color.White,
            fontSize = 32.sp,
            fontWeight = FontWeight.ExtraLight,
            modifier = Modifier.padding(bottom = 48.dp)
        )

        TextField(
            value = "",
            onValueChange = {},
            label = { Text("Name", color = White70) },
            modifier = Modifier.fillMaxWidth(),
            colors = TextFieldDefaults.colors(
                focusedContainerColor = SoftBeige25,
                unfocusedContainerColor = SoftBeige25,
                focusedIndicatorColor = SoftBeige,
                unfocusedIndicatorColor = Color.Transparent
            ),
            shape = RoundedCornerShape(16.dp)
        )

        Spacer(modifier = Modifier.height(16.dp))

        TextField(
            value = "",
            onValueChange = {},
            label = { Text("Email", color = White70) },
            modifier = Modifier.fillMaxWidth(),
            colors = TextFieldDefaults.colors(
                focusedContainerColor = SoftBeige25,
                unfocusedContainerColor = SoftBeige25,
                focusedIndicatorColor = SoftBeige,
                unfocusedIndicatorColor = Color.Transparent
            ),
            shape = RoundedCornerShape(16.dp)
        )

        Spacer(modifier = Modifier.height(16.dp))

        TextField(
            value = "",
            onValueChange = {},
            label = { Text("Password", color = White70) },
            modifier = Modifier.fillMaxWidth(),
            colors = TextFieldDefaults.colors(
                focusedContainerColor = SoftBeige25,
                unfocusedContainerColor = SoftBeige25,
                focusedIndicatorColor = SoftBeige,
                unfocusedIndicatorColor = Color.Transparent
            ),
            shape = RoundedCornerShape(16.dp)
        )

        Spacer(modifier = Modifier.height(32.dp))

        Button(
            onClick = onSignupSuccess,
            modifier = Modifier.fillMaxWidth().height(56.dp),
            colors = ButtonDefaults.buttonColors(containerColor = SoftBeige, contentColor = Black),
            shape = RoundedCornerShape(16.dp)
        ) {
            Text("Begin Journey")
        }

        TextButton(onClick = onNavigateToLogin) {
            Text("Already have a space? (Log In)", color = White70)
        }
    }
}
