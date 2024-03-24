# import random
# from collections import defaultdict

# TIME_SLOTS = (
#     ('8:00 - 8:50'  , '8:50 - 9:40'),
#     ('9:40 - 10:30', '10:45 - 11:30'),
#     ('12:05 - 12:50', '12:50 - 1:35'),
#     ('1:45 - 2:30'  , '2:30 - 3:15 '),
# )

# DAYS_OF_WEEK = (
#     ('Monday', 'Monday'),
#     ('Tuesday', 'Tuesday'),
#     ('Wednesday', 'Wednesday'),
#     ('Thursday', 'Thursday'),
#     ('Friday', 'Friday'),
# )

# class GeneticAlgorithm:
#     def __init__(self, num_classrooms, time_slots, instructors, courses):
#         self.num_classrooms = num_classrooms
#         self.time_slots = time_slots
#         self.instructors = instructors
#         self.courses = courses

#     def generate_timetables(self, generations, num_timetables):
#             timetables = []
#             for i in range(num_timetables):
#                 population = self.initialize_population()
#                 for _ in range(generations):
#                     fitness_scores = [self.fitness(timetable) for timetable in population]
#                     parents = self.selection(population, fitness_scores)
#                     offspring = self.crossover(parents)
#                     population = self.mutation(offspring)
#                     best_timetable = max(population, key=self.fitness)
#                     timetables.append(best_timetable)
#             return timetables

#     def initialize_population(self):
#         population = []
#         for _ in range(self.num_classrooms):
#             timetable = defaultdict(list)
#             for day in range(5):  # Loop over 5 weekdays
#                 for period in range(8):  # Loop over 8 periods per day
#                     slot = (DAYS_OF_WEEK[day][0], TIME_SLOTS[period])
#                     course = self.select_course(slot)
#                     if course:
#                         instructor = self.select_instructor(course)
#                         timetable[slot].append((instructor, course))
#             population.append(timetable)
#         return population

#     def select_course(self, slot):
#         available_courses = [course for course in self.courses if 
#                              course.preferred_day == slot[0] and
#                              course.preferred_start_time <= slot[1][0] and 
#                              course.preferred_end_time >= slot[1][1]]
#         if available_courses:
#             return random.choice(available_courses)
#         else:
#             return None

#     def select_instructor(self, course):
#         preferred_instructors = list(course.instructors.all())
#         if preferred_instructors:
#             return random.choice(preferred_instructors)
#         else:
#             return random.choice(self.instructors)

#     def fitness(self, timetable):
#         # For simplicity, fitness is the total number of unique instructor-course pairs
#         instructor_course_pairs = set()
#         for slot in timetable:
#             for pair in timetable[slot]:
#                 instructor_course_pairs.add(pair)
#         return len(instructor_course_pairs)

#     def selection(self, population, fitness_scores):
#         # Select parents using tournament selection
#         selected_parents = []
#         for _ in range(2):
#             candidates = random.choices(population, weights=fitness_scores, k=3)
#             selected_parents.append(max(candidates, key=self.fitness))
#         return selected_parents

#     def crossover(self, parents):
#         # Perform single-point crossover
#         crossover_point = random.randint(1, len(self.time_slots) - 1)
#         offspring = [{}, {}]
#         for i in range(crossover_point):
#             for slot in parents[0]:
#                 offspring[0][slot] = parents[0][slot]
#                 offspring[1][slot] = parents[1][slot]
#         for i in range(crossover_point, len(self.time_slots)):
#             for slot in parents[0]:
#                 offspring[0][slot] = parents[1][slot]
#                 offspring[1][slot] = parents[0][slot]
#         return offspring

#     def mutation(self, population):
#         # Apply mutation by randomly swapping instructors or courses
#         for timetable in population:
#             slot1, slot2 = random.sample(self.time_slots, 2)
#             timetable[slot1], timetable[slot2] = timetable[slot2], timetable[slot1]
#         return population
