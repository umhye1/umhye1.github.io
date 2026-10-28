# Source: test_assignment_automation.py
# AI-assisted lab; synthetic records only.
# Excerpt, not a standalone executable.
    def test_zero_and_weighted_result(self):
        details, _, totals, _ = collect(self.inputs)
        zero = next(r for r in details if r[0] == "S008" and r[2] == "A3")
        self.assertEqual(zero[3:5], [0, "정상"])
        # S008: A1=A2=79점, A3=0점 -> 79×0.3+79×0.3=47.4
        self.assertEqual(next(r for r in totals if r[0] == "S008")[2], 47.4)
        self.assertIsNone(next(r for r in totals if r[0] == "S003")[2])

