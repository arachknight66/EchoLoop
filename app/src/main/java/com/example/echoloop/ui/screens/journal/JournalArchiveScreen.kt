package com.example.echoloop.ui.screens.journal

import androidx.compose.animation.*
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.echoloop.ui.theme.*

@Composable
fun JournalArchiveScreen(viewModel: JournalViewModel, onBack: () -> Unit) {
    val entries = viewModel.entries

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Black)
            .padding(20.dp)
    ) {
        Row(
            modifier = Modifier.fillMaxWidth().padding(top = 40.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            IconButton(onClick = onBack) {
                Icon(Icons.AutoMirrored.Filled.ArrowBack, null, tint = White)
            }
            Spacer(modifier = Modifier.width(12.dp))
            Text(
                text = "Journal Archive",
                color = White,
                fontSize = 28.sp,
                fontWeight = FontWeight.Light
            )
        }

        Spacer(modifier = Modifier.height(32.dp))

        if (entries.isEmpty()) {
            Box(modifier = Modifier.weight(1f).fillMaxWidth(), contentAlignment = Alignment.Center) {
                Text("No entries yet.", color = White20)
            }
        } else {
            LazyColumn(
                verticalArrangement = Arrangement.spacedBy(16.dp),
                modifier = Modifier.weight(1f)
            ) {
                items(entries) { entry ->
                    ArchiveEntryCard(entry)
                }
            }
        }
    }
}

@Composable
fun ArchiveEntryCard(entry: JournalEntry) {
    var isExpanded by remember { mutableStateOf(false) }

    Card(
        modifier = Modifier
            .fillMaxWidth()
            .animateContentSize()
            .clickable { isExpanded = !isExpanded },
        shape = RoundedCornerShape(22.dp),
        colors = CardDefaults.cardColors(containerColor = SoftBeige12),
        border = BorderStroke(1.dp, White08)
    ) {
        Column(modifier = Modifier.padding(20.dp)) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(entry.date, color = SoftBeige, fontSize = 14.sp, fontWeight = FontWeight.Medium)
                Text(if (isExpanded) "Collapse" else "Expand", color = White20, fontSize = 12.sp)
            }
            
            Spacer(modifier = Modifier.height(12.dp))
            
            if (entry.text.isNotBlank()) {
                Text(
                    text = entry.text,
                    color = White70,
                    fontSize = 15.sp,
                    lineHeight = 22.sp,
                    maxLines = if (isExpanded) Int.MAX_VALUE else 2,
                    overflow = androidx.compose.ui.text.style.TextOverflow.Ellipsis
                )
            }

            if (entry.drawingPaths.isNotEmpty()) {
                Spacer(modifier = Modifier.height(12.dp))
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(if (isExpanded) 200.dp else 80.dp)
                        .background(SoftBeige10, RoundedCornerShape(12.dp))
                ) {
                    Canvas(modifier = Modifier.fillMaxSize()) {
                        entry.drawingPaths.forEach { path ->
                            drawPath(
                                path = path,
                                color = White,
                                style = Stroke(width = 2.dp.toPx(), cap = StrokeCap.Round)
                            )
                        }
                    }
                }
            }
        }
    }
}
