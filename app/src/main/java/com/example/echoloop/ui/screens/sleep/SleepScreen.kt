package com.example.echoloop.ui.screens.sleep

import androidx.compose.animation.*
import androidx.compose.animation.core.*
import androidx.compose.foundation.*
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowForward
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.draw.blur
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.scale
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Path
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.echoloop.ui.theme.*
import kotlin.math.sin

@Composable
fun SleepScreen() {
    val scrollState = rememberScrollState()
    var currentPersona by remember { mutableStateOf(SleepPersona.Drifter) }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Black)
            .verticalScroll(scrollState)
            .padding(20.dp)
    ) {
        Spacer(modifier = Modifier.height(40.dp))
        
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column {
                Text(
                    text = "Sleep",
                    color = White,
                    fontSize = 28.sp,
                    fontWeight = FontWeight.Light
                )
                Text(
                    text = "Your rest, your way",
                    color = White60,
                    fontSize = 16.sp
                )
            }
            
            // Start Sleep Mode Button
            Button(
                onClick = { /* Start Sleep Mode */ },
                colors = ButtonDefaults.buttonColors(containerColor = SoftBeige, contentColor = Black),
                shape = RoundedCornerShape(12.dp),
                contentPadding = PaddingValues(horizontal = 16.dp, vertical = 8.dp)
            ) {
                Icon(Icons.Default.PowerSettingsNew, null, modifier = Modifier.size(18.dp))
                Spacer(modifier = Modifier.width(8.dp))
                Text("Start Sleep", fontSize = 14.sp, fontWeight = FontWeight.Medium)
            }
        }

        Spacer(modifier = Modifier.height(24.dp))

        // Redesigned Sleep Persona Section
        SleepPersonaSection(currentPersona) {
            currentPersona = when(currentPersona) {
                SleepPersona.Drifter -> SleepPersona.Overthinker
                SleepPersona.Overthinker -> SleepPersona.Restless
                SleepPersona.Restless -> SleepPersona.Drifter
            }
        }

        Spacer(modifier = Modifier.height(32.dp))

        SleepRhythmCard()
        
        Spacer(modifier = Modifier.height(8.dp))
        
        Text(
            text = "You fall asleep faster with rain ambience.",
            color = SoftBeige,
            fontSize = 13.sp,
            modifier = Modifier.padding(horizontal = 8.dp)
        )

        Spacer(modifier = Modifier.height(32.dp))

        SpotifyConnectionCard()

        Spacer(modifier = Modifier.height(32.dp))

        Text("Ambient Categories", color = White60, fontSize = 14.sp, modifier = Modifier.padding(bottom = 12.dp))
        AmbientCategoriesRow()

        Spacer(modifier = Modifier.height(32.dp))

        Text("Recommended For Tonight", color = White60, fontSize = 14.sp, modifier = Modifier.padding(bottom = 12.dp))
        PlaylistCard("🌧 Rainfall for Deep Sleep", "Spotify playlist • 45 tracks")
        Spacer(modifier = Modifier.height(12.dp))
        PlaylistCard("🌊 Ocean Night", "Spotify ambient mix • 2h runtime")

        Spacer(modifier = Modifier.height(32.dp))

        AdaptiveModeCard()

        Spacer(modifier = Modifier.height(32.dp))

        SleepTimerCard()

        Spacer(modifier = Modifier.height(100.dp))
    }
}

enum class SleepPersona(val title: String, val subtitle: String, val description: String, val color: Color) {
    Drifter(
        "Drifter", 
        "Gentle Flow", 
        "Your sleep flows like water — gentle, adaptive, and finding its own rhythm.", 
        SoftBeige
    ),
    Overthinker(
        "Overthinker", 
        "Deep Clarity", 
        "Your mind stays active as the stars come out, seeking deep clarity.", 
        Color(0xFFA8A79A)
    ),
    Restless(
        "Restless", 
        "Seeking Shore", 
        "Energy flows through your rest, seeking a shore to land upon.", 
        Color(0xFFC4C3B5)
    )
}

@Composable
fun SleepPersonaSection(persona: SleepPersona, onCycle: () -> Unit) {
    Column(horizontalAlignment = Alignment.CenterHorizontally) {
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .height(300.dp)
                .clip(RoundedCornerShape(28.dp))
                .background(SoftBeige12)
                .border(1.dp, White08, RoundedCornerShape(28.dp))
                .clickable { onCycle() },
            contentAlignment = Alignment.Center
        ) {
            // Background Glow Animation
            PersonaGlow(persona)
            
            // Advanced Visualization
            PersonaVisualization(persona)
            
            // Persona Content
            Column(
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.Bottom,
                modifier = Modifier.fillMaxSize().padding(bottom = 32.dp)
            ) {
                Text(
                    text = persona.title,
                    color = White,
                    fontSize = 24.sp,
                    fontWeight = FontWeight.Light,
                    letterSpacing = 2.sp
                )
                Text(
                    text = persona.subtitle,
                    color = SoftBeige.copy(alpha = 0.6f),
                    fontSize = 12.sp,
                    fontWeight = FontWeight.ExtraLight,
                    letterSpacing = 1.sp
                )
                Spacer(modifier = Modifier.height(12.dp))
                Text(
                    text = persona.description,
                    color = White60,
                    fontSize = 13.sp,
                    modifier = Modifier.padding(horizontal = 48.dp),
                    textAlign = TextAlign.Center,
                    lineHeight = 18.sp
                )
            }
        }
    }
}

@Composable
fun PersonaGlow(persona: SleepPersona) {
    val infiniteTransition = rememberInfiniteTransition(label = "glow")
    val alpha by infiniteTransition.animateFloat(
        initialValue = 0.05f,
        targetValue = 0.15f,
        animationSpec = infiniteRepeatable(
            animation = tween(4000, easing = LinearOutSlowInEasing),
            repeatMode = RepeatMode.Reverse
        ),
        label = "alpha"
    )
    
    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(
                Brush.radialGradient(
                    colors = listOf(persona.color.copy(alpha = alpha), Color.Transparent)
                )
            )
            .blur(40.dp)
    )
}

@Composable
fun PersonaVisualization(persona: SleepPersona) {
    val infiniteTransition = rememberInfiniteTransition(label = "persona_viz")
    
    when(persona) {
        SleepPersona.Drifter -> {
            // Redesigned Ripple Rings: Pulse, Fade, Expand, Repeat
            repeat(3) { i ->
                val scale by infiniteTransition.animateFloat(
                    initialValue = 0.4f,
                    targetValue = 1.8f,
                    animationSpec = infiniteRepeatable(
                        animation = tween(4000, delayMillis = i * 1333, easing = LinearOutSlowInEasing),
                        repeatMode = RepeatMode.Restart
                    ),
                    label = "ripple_scale_$i"
                )
                val alpha by infiniteTransition.animateFloat(
                    initialValue = 0.5f,
                    targetValue = 0f,
                    animationSpec = infiniteRepeatable(
                        animation = tween(4000, delayMillis = i * 1333, easing = LinearOutSlowInEasing),
                        repeatMode = RepeatMode.Restart
                    ),
                    label = "ripple_alpha_$i"
                )
                
                Canvas(modifier = Modifier.size(220.dp)) {
                    drawCircle(
                        color = persona.color,
                        radius = (size.minDimension / 2) * scale,
                        alpha = alpha,
                        style = Stroke(width = 1.dp.toPx())
                    )
                }
            }
        }
        SleepPersona.Overthinker -> {
            // Concentric geometric orbits
            repeat(5) { i ->
                val rotation by infiniteTransition.animateFloat(
                    initialValue = 0f,
                    targetValue = 360f,
                    animationSpec = infiniteRepeatable(
                        animation = tween(8000 + i * 2000, easing = LinearEasing),
                        repeatMode = RepeatMode.Restart
                    ),
                    label = "orbit_rotation_$i"
                )
                Canvas(modifier = Modifier.size(160.dp + (i * 20).dp).alpha(0.2f)) {
                    drawCircle(
                        color = persona.color,
                        style = Stroke(width = 0.5.dp.toPx())
                    )
                }
                Box(
                    modifier = Modifier
                        .size(160.dp + (i * 20).dp)
                        .scale(1f)
                        .padding(2.dp)
                ) {
                    // Small "thought" particle on orbit
                    Box(
                        modifier = Modifier
                            .size(4.dp)
                            .align(Alignment.TopCenter)
                            .background(persona.color.copy(alpha = 0.4f), CircleShape)
                    )
                }
            }
        }
        SleepPersona.Restless -> {
            // Dynamic energy wave field
            repeat(8) { i ->
                val offsetY by infiniteTransition.animateFloat(
                    initialValue = -20f,
                    targetValue = 20f,
                    animationSpec = infiniteRepeatable(
                        animation = tween(1500 + i * 300, easing = SineOverTimeEasing),
                        repeatMode = RepeatMode.Reverse
                    ),
                    label = "wave_offset_$i"
                )
                Canvas(modifier = Modifier.fillMaxWidth().height(100.dp).padding(horizontal = 40.dp)) {
                    val path = Path()
                    val centerY = size.height / 2 + offsetY.dp.toPx()
                    path.moveTo(0f, centerY)
                    path.quadraticTo(size.width / 2, centerY + (i * 5).dp.toPx(), size.width, centerY)
                    drawPath(
                        path = path,
                        color = persona.color.copy(alpha = 0.1f),
                        style = Stroke(width = 1.dp.toPx())
                    )
                }
            }
        }
    }
}

private val SineOverTimeEasing = Easing { fraction ->
    sin(fraction * Math.PI.toFloat())
}

@Composable
fun SleepRhythmCard() {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .height(140.dp),
        shape = RoundedCornerShape(26.dp),
        colors = CardDefaults.cardColors(containerColor = SoftBeige12),
        border = BorderStroke(1.dp, White08)
    ) {
        Column(modifier = Modifier.padding(20.dp)) {
            Text("Sleep Rhythm", color = White70, fontSize = 14.sp)
            Spacer(modifier = Modifier.weight(1f))
            AnimatedWaveGraph()
        }
    }
}

@Composable
fun AnimatedWaveGraph() {
    val infiniteTransition = rememberInfiniteTransition(label = "wave")
    val phase by infiniteTransition.animateFloat(
        initialValue = 0f,
        targetValue = 2f * Math.PI.toFloat(),
        animationSpec = infiniteRepeatable(
            animation = tween(6000, easing = LinearEasing),
            repeatMode = RepeatMode.Restart
        ),
        label = "phase"
    )

    Canvas(modifier = Modifier.fillMaxWidth().height(60.dp)) {
        val width = size.width
        val height = size.height
        val centerY = height / 2
        val path = Path()
        
        for (x in 0..width.toInt() step 2) {
            val y = centerY + 20 * sin(x * 0.02f + phase)
            if (x == 0) path.moveTo(x.toFloat(), y)
            else path.lineTo(x.toFloat(), y)
        }
        
        drawPath(
            path = path,
            color = SoftBeige.copy(alpha = 0.4f),
            style = Stroke(width = 2.dp.toPx())
        )
    }
}

@Composable
fun SpotifyConnectionCard() {
    var isConnected by remember { mutableStateOf(false) }
    
    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(26.dp),
        colors = CardDefaults.cardColors(containerColor = SoftBeige12),
        border = BorderStroke(1.dp, White08)
    ) {
        Row(
            modifier = Modifier.padding(20.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Icon(
                Icons.Default.LibraryMusic,
                contentDescription = null,
                tint = SoftBeige,
                modifier = Modifier.size(32.dp)
            )
            Spacer(modifier = Modifier.width(16.dp))
            Column(modifier = Modifier.weight(1f)) {
                Text(
                    text = if (isConnected) "Spotify Connected ✓" else "Connect Spotify",
                    color = White,
                    fontSize = 16.sp,
                    fontWeight = FontWeight.Medium
                )
                Text(
                    text = if (isConnected) "Sleep playlists available" else "Use your Spotify playlists for sleep soundscapes",
                    color = White60,
                    fontSize = 12.sp
                )
            }
            Button(
                onClick = { isConnected = !isConnected },
                colors = ButtonDefaults.buttonColors(
                    containerColor = if (isConnected) White10 else SoftBeige,
                    contentColor = if (isConnected) White else Black
                ),
                shape = RoundedCornerShape(12.dp)
            ) {
                Text(if (isConnected) "Disconnect" else "Connect", fontSize = 12.sp)
            }
        }
    }
}

@Composable
fun AmbientCategoriesRow() {
    val categories = listOf(
        "Nature" to Icons.Default.Nature,
        "Instrumental" to Icons.Default.MusicNote,
        "Deep Sleep" to Icons.Default.Bedtime
    )
    
    LazyRow(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
        items(categories) { (name, icon) ->
            Card(
                modifier = Modifier.size(120.dp),
                shape = RoundedCornerShape(22.dp),
                colors = CardDefaults.cardColors(containerColor = SoftBeige12),
                border = BorderStroke(1.dp, White08)
            ) {
                Column(
                    modifier = Modifier.fillMaxSize(),
                    verticalArrangement = Arrangement.Center,
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    Icon(icon, null, tint = White70, modifier = Modifier.size(32.dp))
                    Spacer(modifier = Modifier.height(12.dp))
                    Text(name, color = White, fontSize = 14.sp)
                }
            }
        }
    }
}

@Composable
fun PlaylistCard(title: String, subtitle: String) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(24.dp),
        colors = CardDefaults.cardColors(containerColor = SoftBeige12),
        border = BorderStroke(1.dp, White08)
    ) {
        Row(
            modifier = Modifier.padding(16.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Box(
                modifier = Modifier
                    .size(56.dp)
                    .clip(RoundedCornerShape(12.dp))
                    .background(White10),
                contentAlignment = Alignment.Center
            ) {
                Icon(Icons.Default.MusicVideo, null, tint = White20)
            }
            Spacer(modifier = Modifier.width(16.dp))
            Column(modifier = Modifier.weight(1f)) {
                Text(title, color = White, fontSize = 16.sp, fontWeight = FontWeight.Medium)
                Text(subtitle, color = White60, fontSize = 12.sp)
            }
            IconButton(
                onClick = { },
                modifier = Modifier.background(SoftBeige, CircleShape).size(36.dp)
            ) {
                Icon(Icons.Default.PlayArrow, null, tint = Black, modifier = Modifier.size(20.dp))
            }
        }
    }
}

@Composable
fun AdaptiveModeCard() {
    var isOn by remember { mutableStateOf(true) }
    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(26.dp),
        colors = CardDefaults.cardColors(containerColor = SoftBeige12),
        border = BorderStroke(1.dp, White08)
    ) {
        Row(
            modifier = Modifier.padding(20.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column(modifier = Modifier.weight(1f)) {
                Text("Adaptive Mode", color = White, fontSize = 16.sp, fontWeight = FontWeight.Medium)
                Text(
                    "Sound environment adjusts based on your sleep pattern and persona",
                    color = White60,
                    fontSize = 12.sp
                )
            }
            Switch(
                checked = isOn,
                onCheckedChange = { isOn = it },
                colors = SwitchDefaults.colors(
                    checkedThumbColor = Black,
                    checkedTrackColor = SoftBeige,
                    uncheckedThumbColor = White60,
                    uncheckedTrackColor = White10
                )
            )
        }
    }
}

@Composable
fun SleepTimerCard() {
    var selectedOption by remember { mutableStateOf("30 min") }
    val options = listOf("15 min", "30 min", "45 min", "Until asleep")
    
    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(26.dp),
        colors = CardDefaults.cardColors(containerColor = SoftBeige12),
        border = BorderStroke(1.dp, White08)
    ) {
        Column(modifier = Modifier.padding(20.dp)) {
            Text("Sleep Timer", color = White, fontSize = 16.sp, fontWeight = FontWeight.Medium)
            Spacer(modifier = Modifier.height(16.dp))
            Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                options.forEach { option ->
                    val isSelected = selectedOption == option
                    Box(
                        modifier = Modifier
                            .clip(RoundedCornerShape(8.dp))
                            .background(if (isSelected) SoftBeige else White10)
                            .clickable { selectedOption = option }
                            .padding(horizontal = 12.dp, vertical = 6.dp)
                    ) {
                        Text(
                            text = option,
                            color = if (isSelected) Black else White60,
                            fontSize = 12.sp
                        )
                    }
                }
            }
        }
    }
}
