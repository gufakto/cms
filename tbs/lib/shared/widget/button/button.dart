import 'package:flutter/material.dart';

class GButton extends StatefulWidget {

    const GButton({
        required this.label,
        required this.onPressed,
        super.key,
        this.width,
        this.height,
        this.icon,
        this.suffixIcon,
        this.color,
        this.spaceBetween=false,
        this.fontSize,
        this.enabled=true
    });

    final String label;
    final Function onPressed;
    final double? width;
    final double? height;
    final IconData? icon;
    final IconData? suffixIcon;
    final Color? color;
    final bool spaceBetween;
    final double? fontSize;
    final bool enabled;

  @override
  State <GButton> createState() => _GButtonState();

}

class _GButtonState extends State<GButton> {
  
  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    return ElevatedButton(
      onPressed: widget.onPressed(),
      style: ElevatedButton.styleFrom(
        backgroundColor: Colors.blue, // primary color
        foregroundColor: Colors.white, // text color
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(8), // rounded corners
        ),
        padding: EdgeInsets.symmetric(horizontal: 24, vertical: 12),
        elevation: 4,
      ),
      child: Text(
        widget.label,
        style: TextStyle(fontSize: 16),
      ),
    );

  }

}