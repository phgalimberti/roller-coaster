# Ponicode Technical Test - The Roller Coaster

You can resolve the following exercise in JavaScript or TypeScript.
Please approach this test as if the code was going to be pushed to a professional codebase, not as a draft.
Try and solve it with reasonable algorithmic complexity. This means that even the harder tests should run within a **couple of seconds or even less**.

:warning: Do not fork this repository and do not submit any Pull Requests :warning:
When you're done, please create your public repository on GitHub and communicate the URL by email.

## Expectations

You are given 2 hours to design and implement a solution to the following problem in order to run as many test samples as possible (_We will look at the commits to check the time you spent on your dev steps. Don't forget to make a first commit as soon as you start working_ ).
In interview you will be asked to explain your choices of implementation.

You will be evaluated on your program performance as well as on your good pratices of code.

## The Goal

You have recently been assigned to a new amusement park’s center of analysis and supervision. Your mission is to estimate each day what the earnings will be for each ride that day. You start by looking at the roller coaster.

## Rules

You notice that people like the roller coaster so much that as soon as they have finished a ride, they cannot help but go back for another one.

* People queue up in front of the attraction
* They can either be alone or in a group. When groups are in the queue, they necessarily want to ride together, without being separated.
* People never overtake each other in the queue.
* When there isn’t enough space in the attraction for the next group in the queue, the ride starts (so it is not always full).
* As soon as the ride is finished, the groups that come out, go back into the queue in the same order.

The attraction contains a limited number `L` of places.
The attraction can only function `C` number of times per day.
The queue contains a number `N` of groups.
Each group contains a number `Pi` of people.
Each person spends 1  per ride.

## Example
With `L=3`, `C=3` and 4 groups (`N=4`) of the following sizes `[3,1,1,2]`:

**Ride 1**: for the first roller coaster ride, only the first group can get on and takes all the places. At the end of the ride, this group returns to the back of the queue that now looks as follows `[1,1,2,3]`.
Earnings of the ride : 3 dirhams.

**Ride 2**: on the second ride, the following two single-person groups can get on, leaving one place empty (the group of 2 people that follows cannot be separated) At the end of the ride, they return to the back of the queue: `[2,3,1,1]`
Earnings of the ride : 2 dirhams.

**Ride 3**: for the last ride (`C=3)`, only the group of 2 people can get on, leaving one place empty. Earnings of the ride : 2 dirhams.

**Total earnings**: `3 + 2 + 2 = 7 dirhams`

## Game Input

### Input

**Line 1**: The integers `L`, `C` and `N` separated by a space.

`N` following lines: Each line contains an integer `Pi` representing the number of people in a group. The lines are ordered in the same way as the queue. (The first lines correspond to the first groups that can get on the ride).

### Output
An integer representing the number of dirhams earned at the end of the day on the roller coaster (after C roller coaster rides)

### Examples

**Example 1**:

Input
```
3 3 4
3
1
1
2
```

Output
```
7
```


**Example 2**:

Input
```
5 3 4
2
3
5
4
```

Output
```
14
```

**Example 3**:

Input
```
10 100 1
1
```

Output
```
100
```

# Result
You can find in the folder `./samples`, the test cases used  for reviewing your code.

| Sample                                                        | Expected result   |
| ------------------------------------------------------------- | ----------------- |
| 1_simple_case                                                 | 7                 |
| 2_1000_groups_of_few_people                                   | 3935              |
| 3_the_same_groups_go_on_the_ride_several_times_during_the_day | 15                |
| 4_all_the_people_get_on_the_roller_coaster_at_least_once      | 15000             |
| 5_high_earnings_during_the_day                                | 4999975000        |
| 6_works_with_a_large_dataset                                  | 89744892565569    |
| 7_hard                                                        | 8974489271113753  |
| 8_harder                                                      | 89744892714152289 |
