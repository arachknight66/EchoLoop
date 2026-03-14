package com.example.echoloop.ui.screens.journal

import androidx.compose.animation.*
import androidx.compose.animation.core.*
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.gestures.detectDragGestures
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.interaction.collectIsFocusedAsState
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Check
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.scale
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Path
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.input.pointer.pointerInput
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.echoloop.ui.theme.*
import kotlinx.coroutines.delay

@Composable
fun JournalScreen(viewModel: JournalViewModel, onNavigateToArchive: () -> Unit) {
    var text by remember { mutableStateOf("") }
    var isDrawingMode by remember { mutableStateOf(false) }
    val paths = remember { mutableStateListOf<Path>() }
    var showSaveConfirmation by remember { mutableStateOf(false) }
    
    val emotions = listOf("Peaceful", "Restless", "Grateful", "Uncertain", "Hopeful", "Quiet")

    val infiniteTransition = rememberInfiniteTransition(label = "breathing")
    val idleScale by infiniteTransition.animateFloat(
        initialValue = 1.0f,
        targetValue = 1.02f,
        animationSpec = infiniteRepeatable(
            animation = tween(6000, easing = LinearOutSlowInEasing),
            repeatMode = RepeatMode.Reverse
        ),
        label = "idle_scale"
    )

    val interactionSource = remember { MutableInteractionSource() }
    val isFocused by interactionSource.collectIsFocusedAsState()
    val focusOverlayAlpha by animateFloatAsState(
        targetValue = if (isFocused) 0.4f else 0f,
        animationSpec = tween(500),
        label = "focus_overlay"
    )

    Box(modifier = Modifier.fillMaxSize()) {
        Box(
            modifier = Modifier
                .fillMaxSize()
                .background(Color.Black.copy(alpha = focusOverlayAlpha))
        )

        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(24.dp)
        ) {
            Spacer(modifier = Modifier.height(40.dp))
            
            Text(
                text = "Good evening",
                color = White60,
                fontSize = 16.sp,
                fontWeight = FontWeight.ExtraLight
            )
            Text(
                text = "How has today felt?",
                color = White,
                fontSize = 28.sp,
                fontWeight = FontWeight.Light,
                modifier = Modifier.padding(bottom = 32.dp)
            )

            Card(
                modifier = Modifier
                    .weight(1f)
                    .fillMaxWidth()
                    .scale(idleScale)
                    .shadow(
                        elevation = if (isFocused) 20.dp else 12.dp,
                        shape = RoundedCornerShape(28.dp),
                        spotColor = if (isFocused) SoftBeige30 else SoftBeige20
                    ),
                shape = RoundedCornerShape(28.dp),
                colors = CardDefaults.cardColors(containerColor = SoftBeige12),
                border = BorderStroke(1.dp, White08)
            ) {
                Column(modifier = Modifier.fillMaxSize()) {
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(16.dp),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Row(
                            modifier = Modifier
                                .clip(RoundedCornerShape(20.dp))
                                .background(White10)
                        ) {
                            ModeToggleItem("Write", !isDrawingMode) { isDrawingMode = false }
                            ModeToggleItem("Draw", isDrawingMode) { isDrawingMode = true }
                        }
                        
                        if (isDrawingMode) {
                            IconButton(onClick = { paths.clear() }) {
                                Icon(Icons.Default.Delete, "Clear", tint = White60)
                            }
                        }
                    }

                    Box(modifier = Modifier.weight(1f)) {
                        Crossfade(
                            targetState = isDrawingMode,
                            animationSpec = tween(500),
                            label = "input_mode"
                        ) { drawing ->
                            if (drawing) {
                                DrawingCanvas(paths)
                            } else {
                                TextField(
                                    value = text,
                                    onValueChange = { text = it },
                                    placeholder = { Text("Write what’s on your mind...", color = White20) },
                                    modifier = Modifier.fillMaxSize(),
                                    interactionSource = interactionSource,
                                    colors = TextFieldDefaults.colors(
                                        focusedContainerColor = Color.Transparent,
                                        unfocusedContainerColor = Color.Transparent,
                                        focusedIndicatorColor = Color.Transparent,
                                        unfocusedIndicatorColor = Color.Transparent,
                                        cursorColor = SoftBeige,
                                        focusedTextColor = White,
                                        unfocusedTextColor = White
                                    )
                                )
                            }
                        }
                    }

                    Box(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(20.dp),
                        contentAlignment = Alignment.Center
                    ) {
                        Button(
                            onClick = { 
                                viewModel.addEntry(text, paths.toList())
                                showSaveConfirmation = true
                                text = ""
                                paths.clear()
                            },
                            colors = ButtonDefaults.buttonColors(containerColor = SoftBeige, contentColor = Black),
                            shape = RoundedCornerShape(24.dp),
                            modifier = Modifier.height(48.dp).fillMaxWidth(0.6f)
                        ) {
                            Text("Save Entry", fontWeight = FontWeight.Medium)
                        }
                    }
                }
            }

            Spacer(modifier = Modifier.height(24.dp))

            Text(
                text = "You've been writing shorter entries this week.",
                color = White20,
                fontSize = 12.sp,
                modifier = Modifier.align(Alignment.CenterHorizontally)
            )

            Spacer(modifier = Modifier.height(16.dp))

            LazyVerticalGrid(
                columns = GridCells.Fixed(3),
                horizontalArrangement = Arrangement.spacedBy(8.dp),
                verticalArrangement = Arrangement.spacedBy(8.dp),
                modifier = Modifier.height(100.dp)
            ) {
                items(emotions) { emotion ->
                    EmotionTag(emotion)
                }
            }

            TextButton(
                onClick = onNavigateToArchive,
                modifier = Modifier.align(Alignment.CenterHorizontally)
            ) {
                Text("View Past Entries", color = SoftBeige.copy(alpha = 0.6f), fontSize = 14.sp)
            }
        }

        AnimatedVisibility(
            visible = showSaveConfirmation,
            enter = fadeIn() + scaleIn(),
            exit = fadeOut() + scaleOut(),
            modifier = Modifier.align(Alignment.Center)
        ) {
            Card(
                shape = RoundedCornerShape(20.dp),
                colors = CardDefaults.cardColors(containerColor = SoftBeige),
                modifier = Modifier.padding(20.dp)
            ) {
                Row(
                    modifier = Modifier.padding(horizontal = 24.dp, vertical = 12.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Icon(Icons.Default.Check, null, tint = Black)
                    Spacer(modifier = Modifier.width(12.dp))
                    Text("Entry saved", color = Black, fontWeight = FontWeight.Medium)
                }
            }
            
            LaunchedEffect(showSaveConfirmation) {
                if (showSaveConfirmation) {
                    delay(2000)
                    showSaveConfirmation = false
                }
            }
        }
    }
}

@Composable
fun ModeToggleItem(label: String, isSelected: Boolean, onClick: () -> Unit) {
    Box(
        modifier = Modifier
            .clip(RoundedCornerShape(20.dp))
            .background(if (isSelected) SoftBeige else Color.Transparent)
            .clickable { onClick() }
            .padding(horizontal = 16.dp, vertical = 8.dp)
    ) {
        Text(label, color = if (isSelected) Black else White60, fontSize = 14.sp)
    }
}

@Composable
fun EmotionTag(text: String) {
    var isSelected by remember { mutableStateOf(false) }
    var isPressed by remember { mutableStateOf(false) }
    val tapScale by animateFloatAsState(
        targetValue = if (isPressed) 0.95f else 1f,
        animationSpec = tween(100),
        label = "tag_tap"
    )

    Box(
        modifier = Modifier
            .scale(tapScale)
            .clip(RoundedCornerShape(22.dp))
            .background(if (isSelected) SoftBeige20 else White10)
            .clickable { 
                isSelected = !isSelected
                isPressed = true
            }
            .padding(vertical = 12.dp),
        contentAlignment = Alignment.Center
    ) {
        Text(text, color = if (isSelected) SoftBeige else White60, fontSize = 13.sp)
    }
    
    LaunchedEffect(isPressed) {
        if (isPressed) {
            delay(100)
            isPressed = false
        }
    }
}

@Composable
fun DrawingCanvas(paths: MutableList<Path>) {
    var currentPath by remember { mutableStateOf<Path?>(null) }

    Canvas(
        modifier = Modifier
            .fillMaxSize()
            .background(SoftBeige10)
            .pointerInput(Unit) {
                detectDragGestures(
                    onDragStart = { offset ->
                        currentPath = Path().apply { moveTo(offset.x, offset.y) }
                        paths.add(currentPath!!)
                    },
                    onDrag = { change, _ ->
                        currentPath?.lineTo(change.position.x, change.position.y)
                        if (paths.isNotEmpty()) {
                            val last = paths.removeAt(paths.size - 1)
                            paths.add(last)
                        }
                    },
                    onDragEnd = { currentPath = null }
                )
            }
    ) {
        paths.forEach { path ->
            drawPath(
                path = path,
                color = White,
                style = Stroke(width = 3.dp.toPx(), cap = StrokeCap.Round)
            )
        }
    }
}
