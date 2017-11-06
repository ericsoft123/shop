Set oShell = CreateObject ("Wscript.Shell") 

Dim tms
Dim mainapp


tms="cmd /c server.bat"
mainapp="cmd /c mainapp.bat"


oShell.Run tms,0, false
oShell.Run mainapp,0, false
