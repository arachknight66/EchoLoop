package com.example.echoloop.ui.screens.calm

import androidx.compose.animation.*
import androidx.compose.animation.core.*
import androidx.compose.foundation.*
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.scale
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.echoloop.ui.theme.*

@Composable
fun CalmScreen() {
    val scrollState = rememberScrollState()

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
                    text = "Calm",
                    color = White,
                    fontSize = 28.sp,
                    fontWeight = FontWeight.Light
                )
                Text(
                    text = "Find your center",
                    color = White60,
                    fontSize = 16.sp
                )
            }
            
            // Start Meditation Button
            Button(
                onClick = { /* Start Meditation */ },
                colors = ButtonDefaults.buttonColors(containerColor = SoftBeige, contentColor = Black),
                shape = RoundedCornerShape(12.dp)
            ) {
                Icon(Icons.Default.SelfImprovement, null, modifier = Modifier.size(18.dp))
                Spacer(modifier = Modifier.width(8.dp))
                Text("Breathe", fontSize = 14.sp, fontWeight = FontWeight.Medium)
            }
        }

        Spacer(modifier = Modifier.height(24.dp))

        AmbientPlayerCard()

        Spacer(modifier = Modifier.height(32.dp))

        // Spotify Integration
        CalmSpotifyCard()

        Spacer(modifier = Modifier.height(32.dp))

        Text("Meditation Categories", color = White60, fontSize = 14.sp, modifier = Modifier.padding(bottom = 12.dp))
        MeditationCategoriesRow()

        Spacer(modifier = Modifier.height(32.dp))

        Text("Curated For Focus", color = White60, fontSize = 14.sp, modifier = Modifier.padding(bottom = 12.dp))
        PlaylistCard("🧘 Zen Garden Piano", "Spotify • Meditation Mix")
        Spacer(modifier = Modifier.height(12.dp))
        PlaylistCard("🍃 Forest Whispers", "Spotify • Nature Sounds")

        Spacer(modifier = Modifier.height(32.dp))

        QuickResetSection()

        Spacer(modifier = Modifier.height(32.dp))

        CalmMixingCard()

        Spacer(modifier = Modifier.height(100.dp))
    }
}

@Composable
fun AmbientPlayerCard() {
    var isPlaying by remember { mutableStateOf(false) }
    
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .height(200.dp),
        shape = RoundedCornerShape(28.dp),
        colors = CardDefaults.cardColors(containerColor = SoftBeige12),
        border = BorderStroke(1.dp, White08)
    ) {
        Box(contentAlignment = Alignment.Center, modifier = Modifier.fillMaxSize()) {
            if (isPlaying) {
                PremiumRippleAnimation()
            }
            
            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                if (isPlaying) {
                    WaveformGraphic()
                } else {
                    Icon(Icons.Default.Waves, null, tint = White10, modifier = Modifier.size(40.dp))
                }
                
                Spacer(modifier = Modifier.height(24.dp))
                
                IconButton(
                    onClick = { isPlaying = !isPlaying },
                    modifier = Modifier
                        .size(64.dp)
                        .clip(CircleShape)
                        .background(SoftBeige)
                ) {
                    Icon(
                        imageVector = if (isPlaying) Icons.Default.Pause else Icons.Default.PlayArrow,
                        contentDescription = null,
                        tint = Black,
                        modifier = Modifier.size(32.dp)
                    )
                }
                
                Text(
                    text = if (isPlaying) "Playing Stillness" else "Tap to play",
                    color = White60,
                    fontSize = 12.sp,
                    modifier = Modifier.padding(top = 12.dp)
                )
            }
        }
    }
}

@Composable
fun PremiumRippleAnimation() {
    val infiniteTransition = rememberInfiniteTransition(label = "ripple")
    repeat(2) { index ->
        val scale by infiniteTransition.animateFloat(
            initialValue = 1f,
            targetValue = 1.6f,
            animationSpec = infiniteRepeatable(
                animation = tween(3000, delayMillis = index * 1500, easing = LinearOutSlowInEasing),
                repeatMode = RepeatMode.Restart
            ),
            label = "scale_$index"
        )
        val alpha by infiniteTransition.animateFloat(
            initialValue = 0.3f,
            targetValue = 0f,
            animationSpec = infiniteRepeatable(
                animation = tween(3000, delayMillis = index * 1500, easing = LinearOutSlowInEasing),
                repeatMode = RepeatMode.Restart
            ),
            label = "alpha_$index"
        )
        Canvas(modifier = Modifier.size(240.dp)) {
            drawCircle(color = SoftBeige, radius = (size.minDimension / 2) * scale, alpha = alpha)
        }
    }
}

@Composable
fun WaveformGraphic() {
    val infiniteTransition = rememberInfiniteTransition(label = "waveform")
    Row(
        modifier = Modifier.height(30.dp),
        horizontalArrangement = Arrangement.spacedBy(4.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        repeat(10) { index ->
            val heightScale by infiniteTransition.animateFloat(
                initialValue = 0.3f,
                targetValue = 1f,
                animationSpec = infiniteRepeatable(
                    animation = tween(500 + index * 70, easing = LinearEasing),
                    repeatMode = RepeatMode.Reverse
                ),
                label = "bar_$index"
            )
            Box(
                modifier = Modifier
                    .width(3.dp)
                    .height(24.dp * heightScale)
                    .background(SoftBeige, RoundedCornerShape(2.dp))
            )
        }
    }
}

@Composable
fun CalmSpotifyCard() {
    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(26.dp),
        colors = CardDefaults.cardColors(containerColor = SoftBeige12),
        border = BorderStroke(1.dp, White08)
    ) {
        Row(modifier = Modifier.padding(20.dp), verticalAlignment = Alignment.CenterVertically) {
            Icon(Icons.Default.Audiotrack, null, tint = SoftBeige, modifier = Modifier.size(28.dp))
            Spacer(modifier = Modifier.width(16.dp))
            Column(modifier = Modifier.weight(1f)) {
                Text("Spotify Integration", color = White, fontSize = 16.sp, fontWeight = FontWeight.Medium)
                Text("Connect for meditation music", color = White60, fontSize = 12.sp)
            }
            TextButton(onClick = { }) {
                Text("Connect", color = SoftBeige)
            }
        }
    }
}

@Composable
fun MeditationCategoriesRow() {
    val categoryItems = listOf("Zen" to Icons.Default.Spa, "Nature" to Icons.Default.FilterHdr, "Focus" to Icons.Default.TrackChanges)
    LazyRow(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
        items(categoryItems) { item ->
            Card(
                modifier = Modifier.size(110.dp),
                shape = RoundedCornerShape(24.dp),
                colors = CardDefaults.cardColors(containerColor = SoftBeige12),
                border = BorderStroke(1.dp, White08)
            ) {
                Column(
                    modifier = Modifier.fillMaxSize(),
                    verticalArrangement = Arrangement.Center,
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    Icon(item.second, null, tint = SoftBeige20, modifier = Modifier.size(32.dp))
                    Spacer(modifier = Modifier.height(12.dp))
                    Text(item.first, color = White, fontSize = 14.sp)
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
        Row(modifier = Modifier.padding(16.dp), verticalAlignment = Alignment.CenterVertically) {
            Box(modifier = Modifier.size(48.dp).clip(RoundedCornerShape(12.dp)).background(White10), contentAlignment = Alignment.Center) {
                Icon(Icons.Default.MusicNote, null, tint = White20)
            }
            Spacer(modifier = Modifier.width(16.dp))
            Column(modifier = Modifier.weight(1f)) {
                Text(title, color = White, fontSize = 15.sp, fontWeight = FontWeight.Medium)
                Text(subtitle, color = White60, fontSize = 12.sp)
            }
            Icon(Icons.Default.PlayCircleFilled, null, tint = SoftBeige, modifier = Modifier.size(32.dp))
        }
    }
}

@Composable
fun QuickResetSection() {
    Column {
        Text("Quick Reset", color = White60, fontSize = 14.sp, modifier = Modifier.padding(bottom = 12.dp))
        Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
            ResetCard("2 min", "Breathing", Modifier.weight(1f))
            ResetCard("5 min", "Stillness", Modifier.weight(1f))
        }
    }
}

@Composable
fun ResetCard(duration: String, label: String, modifier: Modifier) {
    Card(
        modifier = modifier.height(100.dp),
        shape = RoundedCornerShape(22.dp),
        colors = CardDefaults.cardColors(containerColor = SoftBeige12),
        border = BorderStroke(1.dp, White08)
    ) {
        Column(modifier = Modifier.fillMaxSize().padding(16.dp), verticalArrangement = Arrangement.Center) {
            Text(duration, color = SoftBeige, fontSize = 18.sp, fontWeight = FontWeight.Bold)
            Text(label, color = White60, fontSize = 12.sp)
        }
    }
}

@Composable
fun CalmMixingCard() {
    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(26.dp),
        colors = CardDefaults.cardColors(containerColor = SoftBeige12),
        border = BorderStroke(1.dp, White08)
    ) {
        Column(modifier = Modifier.padding(20.dp)) {
            Text("Meditation Layers", color = White, fontSize = 16.sp, fontWeight = FontWeight.Medium)
            Spacer(modifier = Modifier.height(16.dp))
            LayerSlider("Rain", 0.4f)
            LayerSlider("Bells", 0.6f)
            LayerSlider("Birds", 0.2f)
        }
    }
}

@Composable
fun LayerSlider(label: String, initialValue: Float) {
    var value by remember { mutableStateOf(initialValue) }
    Row(verticalAlignment = Alignment.CenterVertically) {
        Text(label, color = White70, fontSize = 13.sp, modifier = Modifier.width(50.dp))
        Slider(
            value = value,
            onValueChange = { value = it },
            modifier = Modifier.weight(1f),
            colors = SliderDefaults.colors(thumbColor = SoftBeige, activeTrackColor = SoftBeige, inactiveTrackColor = White10)
        )
    }
}
