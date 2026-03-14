package com.example.echoloop.ui.screens.insights

import androidx.compose.animation.*
import androidx.compose.animation.core.*
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.itemsIndexed
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.echoloop.ui.theme.*
import kotlinx.coroutines.delay

data class InsightItem(val title: String, val subtext: String, val icon: ImageVector)

@Composable
fun InsightsScreen() {
    val insights = listOf(
        InsightItem("Sleep shifted later", "Your rest started 45m later than usual.", Icons.Default.AutoGraph),
        InsightItem("Journaling shortened", "Reflections were 30% more concise today.", Icons.Default.EditNote),
        InsightItem("Creative Peak", "Drawing intensity increased between 11 PM - 1 AM.", Icons.Default.Brush)
    )

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Black)
            .padding(20.dp)
    ) {
        Spacer(modifier = Modifier.height(40.dp))
        
        Text(
            text = "Insights",
            color = White,
            fontSize = 28.sp,
            fontWeight = FontWeight.Light
        )
        Text(
            text = "Pattern awareness & reflection",
            color = White60,
            fontSize = 16.sp,
            modifier = Modifier.padding(bottom = 24.dp)
        )

        LazyColumn(
            modifier = Modifier.weight(1f),
            verticalArrangement = Arrangement.spacedBy(16.dp),
            contentPadding = PaddingValues(bottom = 20.dp)
        ) {
            item {
                Text(
                    text = "Weekly Patterns",
                    color = White60,
                    fontSize = 14.sp,
                    modifier = Modifier.padding(top = 16.dp, bottom = 8.dp)
                )
            }

            itemsIndexed(insights) { index, insight ->
                MinimalInsightCard(insight, index)
            }
        }
    }
}

@Composable
fun MinimalInsightCard(insight: InsightItem, index: Int) {
    var visible by remember { mutableStateOf(false) }
    
    LaunchedEffect(Unit) {
        delay(index * 150L)
        visible = true
    }

    AnimatedVisibility(
        visible = visible,
        enter = slideInVertically(
            initialOffsetY = { 20 },
            animationSpec = tween(500, easing = LinearOutSlowInEasing)
        ) + fadeIn(animationSpec = tween(500))
    ) {
        Card(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(22.dp),
            colors = CardDefaults.cardColors(containerColor = SoftBeige12),
            border = BorderStroke(1.dp, White08)
        ) {
            Row(
                modifier = Modifier.padding(16.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Box(
                    modifier = Modifier
                        .size(44.dp)
                        .clip(CircleShape)
                        .background(White08),
                    contentAlignment = Alignment.Center
                ) {
                    Icon(insight.icon, null, tint = SoftBeige, modifier = Modifier.size(20.dp))
                }
                
                Spacer(modifier = Modifier.width(16.dp))
                
                Column(modifier = Modifier.weight(1f)) {
                    Text(
                        text = insight.title,
                        color = White,
                        fontSize = 15.sp,
                        fontWeight = FontWeight.Medium
                    )
                    Text(
                        text = insight.subtext,
                        color = White60,
                        fontSize = 12.sp
                    )
                }
                
                Icon(Icons.Default.ChevronRight, null, tint = White20, modifier = Modifier.size(20.dp))
            }
        }
    }
}
