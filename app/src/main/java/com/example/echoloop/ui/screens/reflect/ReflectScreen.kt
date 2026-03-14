package com.example.echoloop.ui.screens.reflect

import androidx.compose.animation.*
import androidx.compose.animation.core.tween
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.itemsIndexed
import androidx.compose.foundation.lazy.rememberLazyListState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.Send
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.echoloop.ui.theme.*
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch

data class ReflectMessage(val text: String, val isUser: Boolean)

@Composable
fun ReflectScreen() {
    val messages = remember {
        mutableStateListOf(
            ReflectMessage("Welcome back to your reflection space.", false),
            ReflectMessage("You've written less this week than usual. How are you feeling today?", false)
        )
    }

    var query by remember { mutableStateOf("") }
    var isGenerating by remember { mutableStateOf(false) }
    val listState = rememberLazyListState()
    val scope = rememberCoroutineScope()

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Black)
            .padding(20.dp)
    ) {
        Spacer(modifier = Modifier.height(40.dp))
        
        Text(
            text = "Reflect",
            color = White,
            fontSize = 28.sp,
            fontWeight = FontWeight.Light
        )
        Text(
            text = "A mirror of your patterns",
            color = White60,
            fontSize = 16.sp,
            modifier = Modifier.padding(bottom = 24.dp)
        )

        LazyColumn(
            modifier = Modifier.weight(1f),
            state = listState,
            verticalArrangement = Arrangement.spacedBy(16.dp),
            contentPadding = PaddingValues(bottom = 20.dp)
        ) {
            itemsIndexed(messages) { index, message ->
                ReflectBubble(message, index)
            }
            
            if (isGenerating) {
                item {
                    Box(modifier = Modifier.padding(start = 16.dp)) {
                        LinearProgressIndicator(
                            modifier = Modifier.width(60.dp).height(2.dp),
                            color = SoftBeige,
                            trackColor = White08
                        )
                    }
                }
            }
        }

        Spacer(modifier = Modifier.height(16.dp))

        // Conversational AI Input
        OutlinedTextField(
            value = query,
            onValueChange = { query = it },
            placeholder = { Text("Ask about yourself...", color = White20) },
            modifier = Modifier
                .fillMaxWidth()
                .padding(bottom = 16.dp),
            shape = RoundedCornerShape(26.dp),
            colors = OutlinedTextFieldDefaults.colors(
                focusedContainerColor = SoftBeige12,
                unfocusedContainerColor = SoftBeige12,
                focusedBorderColor = SoftBeige20,
                unfocusedBorderColor = White08,
                cursorColor = SoftBeige,
                focusedTextColor = White,
                unfocusedTextColor = White
            ),
            trailingIcon = {
                IconButton(
                    onClick = {
                        val userText = query
                        messages.add(ReflectMessage(userText, true))
                        query = ""
                        isGenerating = true
                        
                        scope.launch {
                            listState.animateScrollToItem(messages.size)
                            delay(2000)
                            messages.add(ReflectMessage(
                                "I've analyzed your recent logs. It seems your creative peaks correlate with late-night restlessness. Transitioning to 'Rain' soundscapes 20 minutes earlier might help ground your energy.", 
                                false
                            ))
                            isGenerating = false
                            listState.animateScrollToItem(messages.size)
                        }
                    },
                    enabled = query.isNotBlank() && !isGenerating
                ) {
                    Icon(
                        Icons.AutoMirrored.Filled.Send, 
                        null, 
                        tint = if (query.isNotBlank()) SoftBeige else White20
                    )
                }
            },
            maxLines = 3
        )
    }
}

@Composable
fun ReflectBubble(message: ReflectMessage, index: Int) {
    var visible by remember { mutableStateOf(false) }
    
    LaunchedEffect(Unit) {
        visible = true
    }

    AnimatedVisibility(
        visible = visible,
        enter = slideInVertically(
            initialOffsetY = { 20 },
            animationSpec = tween(300)
        ) + fadeIn(animationSpec = tween(300))
    ) {
        Box(
            modifier = Modifier.fillMaxWidth(),
            contentAlignment = if (message.isUser) Alignment.CenterEnd else Alignment.CenterStart
        ) {
            Card(
                shape = RoundedCornerShape(22.dp),
                colors = CardDefaults.cardColors(containerColor = Color.Transparent),
                border = BorderStroke(1.dp, White08),
                modifier = Modifier
                    .widthIn(max = 280.dp)
                    .background(
                        brush = Brush.verticalGradient(
                            colors = if (message.isUser) 
                                listOf(White10, White08) 
                            else 
                                listOf(SoftBeige12, SoftBeige10)
                        ),
                        shape = RoundedCornerShape(22.dp)
                    )
            ) {
                Text(
                    text = message.text,
                    color = White,
                    fontSize = 15.sp,
                    lineHeight = 22.sp,
                    modifier = Modifier.padding(16.dp)
                )
            }
        }
    }
}
