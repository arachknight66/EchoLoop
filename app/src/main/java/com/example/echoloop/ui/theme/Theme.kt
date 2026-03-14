package com.example.echoloop.ui.theme

import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color

private val EchoLoopColorScheme = darkColorScheme(
    primary = SoftBeige,
    onPrimary = Black,
    secondary = White60,
    onSecondary = Black,
    tertiary = White10,
    background = Black,
    surface = Black,
    onBackground = White,
    onSurface = White,
    surfaceVariant = SoftBeige12,
    onSurfaceVariant = White,
    outline = White08
)

@Composable
fun ECHOLOOPTheme(
    content: @Composable () -> Unit
) {
    MaterialTheme(
        colorScheme = EchoLoopColorScheme,
        typography = Typography,
        content = content
    )
}
