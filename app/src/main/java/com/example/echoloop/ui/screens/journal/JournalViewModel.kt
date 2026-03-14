package com.example.echoloop.ui.screens.journal

import androidx.compose.runtime.mutableStateListOf
import androidx.compose.ui.graphics.Path
import androidx.lifecycle.ViewModel
import java.text.SimpleDateFormat
import java.util.*

data class JournalEntry(
    val id: String = UUID.randomUUID().toString(),
    val date: String,
    val text: String,
    val drawingPaths: List<Path> = emptyList()
)

class JournalViewModel : ViewModel() {
    private val _entries = mutableStateListOf<JournalEntry>()
    val entries: List<JournalEntry> get() = _entries

    init {
        // Initial mock entries
        _entries.add(JournalEntry("1", "Yesterday", "A bit of a restless night. Trying to focus on gratitude today despite the fatigue."))
        _entries.add(JournalEntry("2", "Feb 20", "Started the new drawing mode. It's interesting how shapes emerge when you don't think."))
    }

    fun addEntry(text: String, drawingPaths: List<Path>) {
        val dateFormat = SimpleDateFormat("MMM dd, yyyy", Locale.getDefault())
        val currentDate = dateFormat.format(Date())
        
        val newEntry = JournalEntry(
            date = "Today, $currentDate",
            text = text,
            drawingPaths = drawingPaths.toList() // Copy the list
        )
        _entries.add(0, newEntry) // Add to top
    }
}
